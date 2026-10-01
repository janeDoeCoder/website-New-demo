# VANNIC Website — Rules

These rules are mandatory for all coding, design and content changes.

## 1. Brand Rules

- Company name: `VANNIC DYNAVION PRIVATE LIMITED`
- Brand name: `VANNIC`
- Product name: `VANNIC GRiDMiND`
- Tagline: `Intelligence Behind Every Kilowatt.`
- Keep naming consistent across all files.
- Do not invent alternative company names.

---

## 2. Product Positioning Rules

VANNIC must be positioned as:

`Electrical infrastructure intelligence + edge monitoring + preventive supervisory control + software`

Do not position VANNIC as:

- only a dashboard
- only an energy meter
- only an IoT platform
- a replacement for every PLC
- a replacement for every BMS
- a replacement for every SCADA platform

Where comparisons are needed, describe VANNIC as a focused electrical intelligence layer that may complement existing systems.

---

## 3. Claims Rules

Never invent:

- customer names
- user counts
- deployments
- pilot results
- revenue
- savings percentages
- testimonials
- patents
- awards
- certifications
- partnerships
- government approvals
- AI model accuracy
- uptime guarantees
- industrial safety certifications

Use wording such as:

- `designed to`
- `being developed to`
- `intended to`
- `can support`
- `aims to`

when a capability is still under development.

---

## 4. Design Rules

The website should feel:

- industrial
- premium
- technically credible
- precise
- modern
- restrained

Avoid:

- generic SaaS template look
- neon cyberpunk effects
- excessive gradients
- excessive glassmorphism
- oversized rounded cards everywhere
- random floating shapes
- stock-photo-heavy layouts
- excessive animations
- cartoon illustrations

Engineering credibility is more important than decoration.

---

## 5. UI Rules

- Primary CTA: `Request a Demo`
- Secondary CTA: `Explore the Platform`
- Keep navigation consistent.
- Do not create more than one competing primary CTA within the same viewport.
- Use clear hierarchy.
- Use whitespace intentionally.
- Keep line lengths readable.
- Avoid dense wall-of-text sections.

---

## 6. Coding Rules

- TypeScript only.
- Use reusable components.
- Prefer Server Components.
- Avoid unnecessary `use client`.
- No unused imports.
- No unused dependencies.
- No console errors.
- No TypeScript errors.
- No broken links.
- No placeholder lorem ipsum.
- No fake API responses.
- No secrets committed to source control.

---

## 7. Responsive Rules

Every change must be checked at:

- mobile
- tablet
- laptop
- desktop

Do not solve desktop issues by breaking mobile.

Do not solve mobile issues by hiding important content.

Complex diagrams must reflow logically.

---

## 8. Animation Rules

Allowed:

- subtle entrance animation
- scroll reveal
- architecture flow
- metric transitions
- hover response

Not allowed:

- constant movement
- bouncing buttons
- distracting particle backgrounds
- aggressive parallax
- animation that blocks readability

Always support reduced-motion preference.

---

## 9. Image Rules

- Do not use random stock imagery.
- Prefer real product imagery when available.
- If a real product photo is unavailable, use clean technical visualisations.
- Do not invent an official VANNIC device design.
- Do not redesign the official logo without approval.

Official brand assets should live in:

`/public/brand/`

---

## 10. Content Rules

Write for:

- decision makers
- facility managers
- electrical engineers
- industrial operators

Copy must be understandable without becoming technically shallow.

Avoid:

- buzzword stacking
- vague AI language
- exaggerated disruption language
- unsupported claims

---

## 11. Change Management Rule

Before making a major redesign:

1. Check `PRD.md`
2. Check `design.md`
3. Check `memory.md`
4. Preserve already-approved content
5. Change only what is required

Do not rewrite the entire website to solve a local UI problem.

---

## 12. Build Rule

Before declaring work complete:

1. Run lint
2. Run type check if configured
3. Run production build
4. Fix all errors
5. Verify responsive layout
6. Verify navigation
7. Verify no horizontal overflow
8. Verify no fake content
