# VANNIC Website — Design System

## 1. Design Direction

The visual system must communicate:

- industrial engineering
- electrical intelligence
- control
- reliability
- precision
- modern infrastructure technology

Reference quality level:

- industrial technology companies
- enterprise infrastructure software
- premium engineering brands

Do not directly copy another company's layout or visual identity.

---

## 2. Brand Palette

### Dark Background

`#061321`

### Secondary Dark

`#0A1D2E`

### Primary Blue

`#1677FF`

### Cyan Accent

`#00C8FF`

### Primary Text

`#F5F8FC`

### Secondary Text

`#9EADC0`

### Light Background

`#FFFFFF`

### Borders

Use subtle dark-mode borders such as:

`rgba(255,255,255,0.08)`

---

## 3. Color Usage

Blue:
- primary CTA
- active states
- important data
- technical flow

Cyan:
- secondary technical highlight
- data visualization accents

Emerald:
- normal / healthy electrical state
- use sparingly

Amber:
- warning

Red:
- critical / fault state only

Do not use alert colors decoratively.

---

## 4. Typography

Recommended:

`Inter`

Fallback:

```css
font-family: Inter, ui-sans-serif, system-ui, sans-serif;
```

### Headline Character

- strong
- compact
- engineering-focused
- high contrast
- controlled line length

### Suggested Scale

Desktop H1:
`clamp(3.25rem, 6vw, 6rem)`

Section H2:
`clamp(2.25rem, 4vw, 4rem)`

Body:
`1rem–1.125rem`

Small labels:
`0.75rem–0.875rem`

Avoid oversized text that destroys information density.

---

## 5. Spacing

Use an 8px-based spacing system.

Typical section padding:

Desktop:
`96px–144px`

Tablet:
`72px–96px`

Mobile:
`56px–72px`

Keep related content visually grouped.

---

## 6. Corners

Use moderate radii.

Suggested:

- small: `8px`
- medium: `12px`
- large: `18px`

Avoid excessive pill-shaped containers.

---

## 7. Shadows

Shadows should be subtle.

Blue glow may be used on:

- primary CTA
- active technical nodes
- selected product element

Never use glow on every card.

---

## 8. Navigation

Desktop:

```text
VANNIC | Home | Platform | Technology | Industries | About | Contact | Request a Demo
```

Navigation behavior:

- transparent / dark over hero
- subtle background and blur after scrolling
- sticky
- compact height
- strong CTA

Mobile:

- simple menu button
- full-height or contained navigation panel
- easy touch targets
- clear close behavior

---

## 9. Hero Design

Preferred layout:

```text
LEFT                                  RIGHT

VANNIC GRiDMiND                       Electrical Infrastructure
                                      ↓
Detect Electrical Risks              VANNIC Edge Controller
Before They Become Downtime.          ↓
                                      GRiDMiND Platform

Description                           Electrical metrics
CTA CTA                               Load priority
                                      Event state
```

Hero visual must connect physical infrastructure with software.

Do not use a generic laptop mockup as the main visual.

---

## 10. Technical Visualization Style

Use:

- clean circuit-like lines
- thin grid lines
- structured nodes
- compact status chips
- real electrical terminology
- small data modules

Examples:

- R / Y / B phase
- voltage
- current
- power factor
- event state
- priority state
- edge controller

The visual should resemble industrial software, not cryptocurrency UI.

---

## 11. Cards

Cards should have:

- low contrast border
- controlled radius
- dark layered surfaces
- concise content
- intentional hierarchy

Recommended structure:

```text
ICON / NUMBER

TITLE

Short technical description
```

Do not put every piece of content inside a card.

---

## 12. Section Heading Pattern

```text
EYEBROW

Main section heading

Short description
```

Keep eyebrow labels short.

---

## 13. Buttons

### Primary

Background:
`#1677FF`

Text:
white

Hover:
slight lift / brightness increase

### Secondary

Transparent or dark background

Border:
subtle

Text:
white

Avoid excessive button glow.

---

## 14. Motion

Use motion to explain hierarchy or system flow.

Good uses:

- hero load-in
- edge architecture line progression
- card entrance
- metric transition

Duration:

`150ms–500ms`

No slow ornamental animations.

---

## 15. Mobile Design

Mobile is not a compressed desktop layout.

On mobile:

- stack visual architecture
- shorten long line lengths
- enlarge tap areas
- keep metrics readable
- simplify visual connectors
- move supporting visualization below copy

---

## 16. Footer

Footer should be simple and enterprise-grade.

Include:

- Company
- Product
- Industries
- Contact
- Legal
- Social links

Avoid a giant decorative footer.

---

## 17. Visual QA Checklist

Before approval:

- Hero feels balanced
- Main value proposition is immediately visible
- VANNIC hardware + software story is clear
- No generic SaaS feel
- No excessive visual effects
- Mobile spacing is deliberate
- Typography hierarchy is consistent
- CTAs are obvious
- Technical visuals remain understandable
