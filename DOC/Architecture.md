# VANNIC Website — Architecture

## 1. Technology Stack

Recommended stack:

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Next/Image
- App Router

Avoid unnecessary dependencies.

---

## 2. Application Structure

```text
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── platform/
│   │   └── page.tsx
│   ├── technology/
│   │   └── page.tsx
│   ├── industries/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── MonitoringFlow.tsx
│   │   ├── PlatformOverview.tsx
│   │   ├── ArchitectureDiagram.tsx
│   │   ├── Problems.tsx
│   │   ├── PreventiveControl.tsx
│   │   ├── EdgeIntelligence.tsx
│   │   ├── Industries.tsx
│   │   ├── Comparison.tsx
│   │   ├── PlatformFeatures.tsx
│   │   ├── Brownfield.tsx
│   │   └── CTASection.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── IndustryCard.tsx
│   │   ├── ProblemCard.tsx
│   │   └── MetricDisplay.tsx
│   │
│   └── visuals/
│       ├── GridMindPanel.tsx
│       ├── EdgeControllerVisual.tsx
│       └── ElectricalFlow.tsx
│
├── content/
│   ├── company.ts
│   ├── industries.ts
│   ├── features.ts
│   └── navigation.ts
│
├── public/
│   ├── brand/
│   ├── images/
│   └── icons/
│
├── lib/
│   ├── constants.ts
│   └── utils.ts
│
└── README.md
```

---

## 3. Rendering Strategy

Use Server Components by default.

Use Client Components only when required for:

- mobile navigation
- animations
- interactive diagrams
- contact form state
- responsive client-only interactions

Do not mark entire pages with `use client` unless necessary.

---

## 4. Component Architecture

### Layout Components

Global components:
- Navbar
- Footer
- MobileMenu
- CTA system

### Section Components

Each major homepage section should be independently reusable and testable.

### Content Separation

Content should live separately from layout when practical.

Example:

```ts
export const industries = [
  {
    title: "Manufacturing & MSMEs",
    description: "...",
  },
];
```

Avoid hardcoding repeated card content directly into JSX.

---

## 5. Data Flow

Current website is primarily static.

No database required for initial release.

Contact form:

```text
Browser
   ↓
Client-side validation
   ↓
Future API endpoint
   ↓
Email / CRM / lead system
```

Until a backend exists, do not pretend messages are being sent.

---

## 6. Product Story Architecture

The website must visually reinforce:

```text
Electrical Infrastructure
        ↓
Sensors / Metering
        ↓
VANNIC Industrial Edge Controller
        ↓
Local Intelligence & Control
        ↓
Secure Data Layer
        ↓
VANNIC GRiDMiND
        ↓
Facility / Operator Team
```

This architecture is central to the website.

Do not visually position GRiDMiND as only a cloud dashboard.

---

## 7. Responsive Breakpoints

Design intentionally for:

- 360px
- 390px
- 430px
- 768px
- 1024px
- 1366px
- 1440px
- 1920px

Requirements:

- no horizontal overflow
- no clipped sections
- no tiny text
- no desktop-only diagrams squeezed into mobile
- stack complex diagrams on smaller screens

---

## 8. SEO Architecture

Each route should define:

- title
- description
- canonical intent
- Open Graph metadata

Required:

- `robots.txt`
- `sitemap.xml`
- favicon support
- semantic heading structure

Only one main H1 per page.

---

## 9. Performance Architecture

Priorities:

1. Server rendering
2. Minimal JS
3. No background video
4. Optimized assets
5. Lazy-loaded lower-page media
6. Reuse SVG/CSS diagrams where practical
7. Avoid large animation libraries beyond required use

---

## 10. Accessibility

Target:

- keyboard navigation
- visible focus states
- sufficient contrast
- semantic landmarks
- descriptive buttons
- form labels
- `aria` only when semantic HTML is insufficient
- respect `prefers-reduced-motion`

---

## 11. Future Architecture

Future integrations may include:

- demo booking backend
- CRM
- analytics
- newsletter
- careers
- product documentation
- pilot enquiry workflow
- customer portal
- authentication
- live GRiDMiND dashboard

These should not be built into the first public website unless explicitly requested.
