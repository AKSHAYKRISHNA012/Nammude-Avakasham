# DESIGN.md – Design System & Anti-Slop Protocol
**Standard**: `voltagent/awesome-design-md` & `taste-skill`
**Scale**: 8-Point Fluid Spatial Grid

---

## 1. Color Tokens & Theme Architecture

### Primary Palette: Kerala Deep Rainforest & Temple Kasavu
```css
/* Core Brand Tokens */
--kerala-deep: #064e3b;       /* Emerald-950: Main brand headers, authority surfaces */
--kerala-emerald: #047857;    /* Emerald-700: Primary actions, verified badges */
--kerala-gold: #d97706;       /* Amber-600: Accent trims, highlights */
--kerala-amber: #f59e0b;      /* Amber-500: Primary voice triggers, audio waveforms */
--kerala-sand: #fcfaf7;       /* Warm coconut cream: Primary app background */
--kerala-surface: #ffffff;    /* Card & modal elevated surface */

/* Semantic States */
--semantic-success: #059669;  /* Verified criteria, taken medicines */
--semantic-warning: #d97706;  /* Missing documents, mustering alerts */
--semantic-danger: #dc2626;   /* Red-flag emergency triage (108/1056), drug allergies */
--semantic-info: #0284c7;     /* Official portal links, guidance */

/* High Contrast WCAG AAA */
--contrast-bg: #000000;
--contrast-text: #ffff00;
--contrast-border: #ffff00;
```

---

## 2. Typography Scales & Pairing
- **Malayalam Script Primary**: `"Noto Sans Malayalam"` (Google Fonts) – 400, 500, 600, 700, 800, 900.
  - Line-height: `1.6` to `1.75` for elderly readability with clear vowel diacritics.
- **English & Numerics Secondary**: `"Plus Jakarta Sans"` – geometric, highly legible digits and headers.

### Scale:
- `Display 1`: 48px / 56px (Hero headlines)
- `Heading 1`: 32px / 40px (Page titles)
- `Heading 2`: 24px / 32px (Card titles, scheme names)
- `Body Large`: 18px / 28px (Senior voice readout paragraphs)
- `Body Regular`: 15px / 24px (General explanations)
- `Caption`: 12px / 16px (Meta badges, timestamps)

---

## 3. Spatial System (8pt Grid)
- `Space 1` (4px): Micro gaps between audio wave bars
- `Space 2` (8px): Badge padding, icon text gaps
- `Space 3` (12px): Chat bubble spacing
- `Space 4` (16px): Input padding, pill tabs
- `Space 6` (24px): Card interior padding
- `Space 8` (32px): Section separation
- `Space 12` (48px): Minimum touch target height for mobile ergonomics

---

## 4. Anti-Slop Principles
1. **Zero Generic Stock Fillers**: Every illustration, emoji, and icon has direct cultural and functional meaning (🌴 Kerala coconut palm, 🩺 Stethoscope, 👵 Senior citizen, ♿ PwD).
2. **Tactile Feedback**: Every button exhibits interactive scale compression (`active:scale-95`), soft glow ring (`ring-2 ring-emerald-500/40`), and clear status change.
3. **Audio-Visual Synchrony**: Spoken playback always triggers bouncing waveform visualizers (`AudioWaveVisualizer.jsx`).
