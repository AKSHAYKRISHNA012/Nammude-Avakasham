# DESIGN.md – Design System & World-Class Public Service Architecture
**Standard**: `voltagent/awesome-design-md`, `taste-skill`, & Apple Human Interface / Linear / Stripe Guidelines
**Scale**: 8-Point Fluid Spatial Grid
**Palette**: Kerala Rainforest Deep Green, Kasavu Gold, Warm Ivory, Pure White, Charcoal

---

## 1. Color Tokens & Brand Hierarchy

### Primary Palette: Kerala Heritage & Modern AI SaaS
```css
/* Core Kerala Brand Tokens */
--kerala-deep: #064e3b;          /* Emerald-950: Main brand headers, authority surfaces, hero base */
--kerala-deep-dark: #022c22;     /* Darkest rainforest green: Secondary cards, dark preview panels */
--kerala-emerald: #047857;       /* Emerald-700: Primary actions, verified badges, interactive buttons */
--kerala-gold: #d97706;          /* Amber-600: Accent trims, Kasavu borders, high-priority highlights */
--kerala-amber: #f59e0b;         /* Amber-500: Primary voice triggers, audio waveforms, gold CTAs */
--kerala-sand: #FAF8F5;          /* Warm Ivory / Coconut cream: Primary light application background */
--kerala-surface: #ffffff;       /* Card elevated surface, clean white containers */
--kerala-charcoal: #18181b;      /* High contrast text, crisp typography */

/* Semantic States */
--semantic-success: #059669;     /* Verified criteria, taken medicines, 75+ scheme badges */
--semantic-warning: #d97706;     /* Missing documents, mustering alerts, unreadable Rx warnings */
--semantic-danger: #dc2626;      /* Red-flag emergency triage (108 Ambulance / 1056 DISHA), drug allergies */
--semantic-info: #0284c7;        /* Official portal links, statutory guidance */

/* High Contrast WCAG AAA */
--contrast-bg: #000000;
--contrast-text: #FFFF00;
--contrast-border: #FFFF00;
```

---

## 2. Typography Scales & Bilingual Pairing
- **Malayalam Script Primary**: `"Noto Sans Malayalam"` (Google Fonts) – 400, 500, 600, 700, 800, 900.
  - Line-height: `1.6` to `1.75` for elderly readability with clear vowel diacritics.
- **English & Numerics Secondary**: `"Plus Jakarta Sans"` – geometric, highly legible digits and headers.

### Scale:
- `Display Hero`: 48px – 60px (Hero headlines, responsive clamp)
- `Heading 1`: 32px – 40px (Section titles, modal headers)
- `Heading 2`: 22px – 28px (Service card titles, scheme names)
- `Body Large`: 18px / 28px (Senior voice readout paragraphs)
- `Body Regular`: 15px / 24px (General explanations, card text)
- `Caption / Badges`: 11px – 13px (Status tags, timestamps, helpline badges)

---

## 3. Spatial System (8pt Fluid Grid)
- `Space 1` (4px): Micro gaps between audio wave bars
- `Space 2` (8px): Badge padding, icon text gaps
- `Space 3` (12px): Chat bubble spacing, list item margins
- `Space 4` (16px): Input padding, pill tabs, mobile padding
- `Space 6` (24px): Card interior padding, dialog body
- `Space 8` (32px): Section separation
- `Space 12` (48px): Minimum touch target height for mobile ergonomics (WCAG 2.1 AA)

---

## 4. Anti-Slop & Design Directives
1. **Zero Generic Stock Fillers**: Every illustration, emoji, and icon has cultural and functional meaning (🌴 Kerala coconut palm, 🩺 Stethoscope, 👵 Senior citizen, ♿ PwD).
2. **Tactile Feedback**: Every button exhibits interactive scale compression (`active:scale-95`), soft glow ring (`ring-2 ring-amber-300/60`), and clear status change.
3. **Audio-Visual Synchrony**: Spoken playback triggers bouncing waveform visualizers (`AudioWaveVisualizer.jsx`).
4. **No Excessive Purple or AI Slop**: Cohesive Kerala rainforest deep green & Kasavu gold palette replaces third-party template colors.
