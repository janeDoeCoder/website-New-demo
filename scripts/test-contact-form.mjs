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

  async navigate(url) {
    await this.send('Page.navigate', { url });
    // Wait for hydration by checking if React component is mounted
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 500));
      const hydrated = await this.evaluate(`
        (() => {
          const form = document.querySelector('form');
          // Check if React internal props or event handlers are attached
          if (!form) return false;
          const keys = Object.keys(form);
          return keys.some(k => k.startsWith('__reactFiber') || k.startsWith('__reactProps'));
        })()
      `);
      if (hydrated) {
        console.log('React is hydrated after', (i + 1) * 500, 'ms');
        break;
      }
    }
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function testContactForm() {
  const tmpDir = path.join(os.tmpdir(), 'chrome-form-test-' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    `--user-data-dir=${tmpDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    'about:blank'
  ]);

  for (let i = 0; i < 30; i++) {
    try {
      const verRes = await fetch('http://127.0.0.1:9223/json/version');
      if (verRes.ok) {
        const listRes = await fetch('http://127.0.0.1:9223/json/list');
        const list = await listRes.json();
        let tab = list.find(t => t.type === 'page');
        if (!tab) {
          const newRes = await fetch('http://127.0.0.1:9223/json/new', { method: 'PUT' });
          tab = await newRes.json();
        }
        const cdp = new CDP(tab.webSocketDebuggerUrl);
        await cdp.connect();

        await cdp.navigate('http://localhost:3000/contact');

        // Test 1: Submit empty form
        const validationResult = await cdp.evaluate(`
          (async () => {
            const submitBtn = document.querySelector('button[type="submit"]');
            submitBtn.click();
            // Wait for React to re-render state update
            await new Promise(r => setTimeout(r, 200));
            const errors = Array.from(document.querySelectorAll('p'))
              .filter(p => p.innerText.includes('Please'))
              .map(p => p.innerText.trim());
            return errors;
          })()
        `);
        console.log('Validation errors on empty submit:', validationResult);

        // Test 2: Fill in fields and submit
        const submissionResult = await cdp.evaluate(`
          (async () => {
            const setNativeInput = (el, val) => {
              const proto = el instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
              const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
              setter.call(el, val);
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
            };

            setNativeInput(document.querySelector('#fullName'), 'Test Engineer');
            setNativeInput(document.querySelector('#company'), 'Test Industrial Corp');
            setNativeInput(document.querySelector('#email'), 'engineer@testcorp.com');
            setNativeInput(document.querySelector('#phone'), '+91 9876543210');
            setNativeInput(document.querySelector('#facilityType'), 'Main 11kV Substation');
            setNativeInput(document.querySelector('#message'), 'Need power quality monitoring and nuisance trip prevention.');

            await new Promise(r => setTimeout(r, 100));
            const submitBtn = document.querySelector('button[type="submit"]');
            submitBtn.click();
            await new Promise(r => setTimeout(r, 2000));

            return {
              hasSuccessTitle: !!document.querySelector('h3'),
              successTitle: document.querySelector('h3')?.innerText,
              hasConfirmation: document.body.innerText.includes('Enquiry Received')
            };
          })()
        `);
        console.log('Submission result:', submissionResult);

        cdp.close();
        proc.kill();
        return;
      }
    } catch {
      await new Promise(r => setTimeout(r, 300));
    }
  }
  proc.kill();
  throw new Error('Failed to run contact form test');
}

testContactForm().catch(console.error);
