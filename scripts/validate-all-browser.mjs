import { spawn } from 'child_process';
import os from 'os';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

class CDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
    this.events = [];
    this.consoleLogs = [];
    this.exceptions = [];
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && this.callbacks.has(data.id)) {
        const { resolve, reject } = this.callbacks.get(data.id);
        this.callbacks.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      } else if (data.method) {
        if (data.method === 'Runtime.consoleAPICalled') {
          const type = data.params.type;
          const text = (data.params.args || []).map(a => a.value || a.description || '').join(' ');
          this.consoleLogs.push({ type, text });
        } else if (data.method === 'Runtime.exceptionThrown') {
          this.exceptions.push(data.params.exceptionDetails);
        }
      }
    };

    await this.send('Page.enable');
    await this.send('Runtime.enable');
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }

  async setViewport(width, height) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 1024,
    });
  }

  async navigate(url) {
    this.consoleLogs = [];
    this.exceptions = [];
    await this.send('Page.navigate', { url });
    // Wait for page to stabilize
    await new Promise(r => setTimeout(r, 1200));
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function startChrome() {
  const tmpDir = path.join(os.tmpdir(), 'chrome-headless-' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    `--user-data-dir=${tmpDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1440,900',
    'about:blank'
  ]);

  for (let i = 0; i < 30; i++) {
    try {
      const verRes = await fetch('http://127.0.0.1:9222/json/version');
      if (verRes.ok) {
        const listRes = await fetch('http://127.0.0.1:9222/json/list');
        const list = await listRes.json();
        let tab = list.find(t => t.type === 'page');
        if (!tab) {
          const newRes = await fetch('http://127.0.0.1:9222/json/new', { method: 'PUT' });
          tab = await newRes.json();
        }
        return { proc, tab };
      }
    } catch {
      await new Promise(r => setTimeout(r, 300));
    }
  }
  proc.kill();
  throw new Error('Chrome failed to start');
}

async function runValidation() {
  console.log('--- Starting Chrome ---');
  const { proc, tab } = await startChrome();
  const cdp = new CDP(tab.webSocketDebuggerUrl);
  await cdp.connect();

  const routes = ['/', '/platform', '/technology', '/industries', '/about', '/contact'];
  const viewports = [
    { w: 360, h: 800 },
    { w: 390, h: 844 },
    { w: 430, h: 932 },
    { w: 768, h: 1024 },
    { w: 1024, h: 768 },
    { w: 1366, h: 768 },
    { w: 1440, h: 900 }
  ];

  const results = {
    overflows: [],
    consoleErrors: [],
    brokenElements: [],
    passedPages: [],
    viewportTests: []
  };

  console.log('\n--- 1. Testing Route Loading & Console Errors at 1440px ---');
  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    await cdp.setViewport(1440, 900);
    await cdp.navigate(url);

    const title = await cdp.evaluate('document.title');
    const h1Text = await cdp.evaluate('document.querySelector("h1")?.innerText || "NO H1"');
    const severeErrors = cdp.consoleLogs.filter(l => l.type === 'error' && !l.text.includes('favicon'));
    const exceptions = cdp.exceptions;

    if (severeErrors.length > 0 || exceptions.length > 0) {
      results.consoleErrors.push({ route, severeErrors, exceptions });
    }

    console.log(`Route [${route}]: Title="${title}", H1="${h1Text.slice(0, 40)}...", Errors=${severeErrors.length + exceptions.length}`);
    results.passedPages.push({ route, title, hasH1: h1Text !== 'NO H1' });
  }

  console.log('\n--- 2. Testing Responsive Viewports & Horizontal Overflow across Routes ---');
  for (const vp of viewports) {
    for (const route of routes) {
      await cdp.setViewport(vp.w, vp.h);
      await cdp.navigate(`http://localhost:3000${route}`);

      const overflowData = await cdp.evaluate(`
        (() => {
          const docEl = document.documentElement;
          const body = document.body;
          const winW = window.innerWidth;
          const scrollW = Math.max(docEl.scrollWidth, body.scrollWidth);
          const hasOverflow = scrollW > winW + 1; // 1px threshold for subpixel

          let culprit = null;
          if (hasOverflow) {
            const all = document.querySelectorAll('*');
            for (const el of all) {
              const r = el.getBoundingClientRect();
              if (r.right > winW + 2 && r.width > 0) {
                culprit = {
                  tag: el.tagName,
                  id: el.id,
                  className: el.className ? String(el.className).slice(0, 80) : '',
                  right: Math.round(r.right),
                  width: Math.round(r.width)
                };
                break;
              }
            }
          }

          return { winW, scrollW, hasOverflow, culprit };
        })()
      `);

      if (overflowData.hasOverflow) {
        console.warn(`[OVERFLOW] ${route} at ${vp.w}px: scrollW=${overflowData.scrollW}, culprit:`, overflowData.culprit);
        results.overflows.push({ route, vp: vp.w, ...overflowData });
      } else {
        results.viewportTests.push({ route, vp: vp.w, status: 'OK' });
      }
    }
  }

  console.log('\n--- 3. Testing Navigation & Mobile Menu ---');
  await cdp.setViewport(390, 844);
  await cdp.navigate('http://localhost:3000/');
  const menuTest = await cdp.evaluate(`
    (() => {
      // Check for mobile menu toggle button
      const menuBtn = document.querySelector('button[aria-label*="menu" i], button[aria-label*="navigation" i]') ||
                      document.querySelector('header button, nav button');
      if (!menuBtn) return { hasMenuBtn: false };

      menuBtn.click();
      return {
        hasMenuBtn: true,
        menuBtnAria: menuBtn.getAttribute('aria-expanded'),
        navLinksCount: document.querySelectorAll('nav a, div[role="dialog"] a').length
      };
    })()
  `);
  console.log('Mobile menu test at 390px:', menuTest);

  console.log('\n--- 4. Testing Contact Form on /contact ---');
  await cdp.setViewport(390, 844);
  await cdp.navigate('http://localhost:3000/contact');
  const formTest = await cdp.evaluate(`
    (() => {
      const nameInput = document.querySelector('input[name="name"], input[id*="name" i]');
      const emailInput = document.querySelector('input[name="email"], input[type="email"]');
      const submitBtn = document.querySelector('button[type="submit"]');

      return {
        hasName: !!nameInput,
        hasEmail: !!emailInput,
        hasSubmit: !!submitBtn,
        submitDisabled: submitBtn?.disabled,
        submitText: submitBtn?.innerText
      };
    })()
  `);
  console.log('Contact form test:', formTest);

  cdp.close();
  proc.kill();

  console.log('\n=========================================');
  console.log('VALIDATION SUMMARY:');
  console.log(`Routes Tested: ${routes.length} / ${results.passedPages.length} OK`);
  console.log(`Viewport Tests: ${results.viewportTests.length}`);
  console.log(`Horizontal Overflows: ${results.overflows.length}`);
  console.log(`Console Errors: ${results.consoleErrors.length}`);
  console.log('=========================================');

  if (results.overflows.length > 0) {
    console.log('Overflow Details:', JSON.stringify(results.overflows, null, 2));
  }
}

runValidation().catch(e => {
  console.error('Validation error:', e);
  process.exit(1);
});
