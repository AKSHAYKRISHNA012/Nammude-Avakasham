# നമ്മുടെ അവകാശം (Nammude Avakasham) & വോയ്‌സ് വൈദ്യ (VoiceVaidya)
### AI Public Welfare Rights Navigator & Malayalam Healthcare Companion for Senior Citizens & PwD in Kerala

> **"Digital Empowerment for Every Keralite"**  
> An accessible, bilingual public service platform empowering senior citizens and differently-abled individuals in Kerala with AI rights navigation, prescription understanding, and voice healthcare guidance.

[![Live Demo on GitHub Pages](https://img.shields.io/badge/Live_Demo-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://akshaykrishna012.github.io/Nammude-Avakasham/)
[![CI Deployment](https://github.com/AKSHAYKRISHNA012/Nammude-Avakasham/actions/workflows/deploy.yml/badge.svg)](https://github.com/AKSHAYKRISHNA012/Nammude-Avakasham/actions/workflows/deploy.yml)

🌐 **Live Website Link**: [https://akshaykrishna012.github.io/Nammude-Avakasham/](https://akshaykrishna012.github.io/Nammude-Avakasham/)

---

## 🌟 Executive Overview

**Nammude Avakasham & VoiceVaidya** is a unified, voice-first, accessible digital public infrastructure platform built for senior citizens, persons with disabilities (PwD), and family caregivers in Kerala. Inspired by Apple Human Interface Guidelines, Linear's dashboard hierarchy, Stripe's typography, and statutory digital accessibility standards, the platform breaks down bureaucratic, language, and technological barriers.

---

## 🌴 Core Engines & Capabilities

### 1. 🏠 World-Class Public Landing Page
- **Bilingual Sticky Navigation**: Accessible navigation with desktop menu, mobile drawer, instant `മലയാളം` / `English` switcher, and portal sign-in.
- **Dynamic Hero Section**: Real-time spoken Malayalam voice narration via native Web Speech synthesis (`ml-IN`), live interactive preview container, and floating benefit cards (₹1,600/mo pension badge, active Rx OCR status).
- **5 Pillars of Trust & Impact**: Citizen Empowerment, Malayalam-First UX, DPDP 2023 Privacy Architecture, AI Healthcare Guidance, and Universal Accessibility (no fabricated statistics).
- **7 Interactive Core Service Cards**:
  1. *Scheme Discovery* (75+ Central and Kerala Government welfare schemes)
  2. *Eligibility Assessment* (5-step interactive wizard)
  3. *Application Guidance* (Printable Akshaya-ready draft forms)
  4. *Document Intelligence* (AI OCR for Ration Cards & Disability Certificates)
  5. *Application Tracking* (Stage-by-stage stepper + Annual Mustering alerts)
  6. *Voice-Based Assistance* (Natural spoken conversational AI)
  7. *Citizen Rights & Helplines* (Elder Helpline 14567, DISHA 1056, KSSM 1800 120 1001)
- **VoiceVaidya Spotlight**: Interactive healthcare conversation preview, voice medication reminders, caregiver sync, and prominent statutory medical safety notices.
- **4-Step Illustrated Process**: Connected journey from service selection to certified Akshaya submission.
- **Universal Accessibility Suite**: WCAG 2.1 AA compliant, High-Contrast Mode (Yellow on Black, WCAG AAA), 3x font scaling, ARIA landmarks, and keyboard navigation.
- **Zero-Trust Security & Privacy**: Compliant with India's Digital Personal Data Protection (DPDP) Act 2023. Zero client-side secrets.
- **Interactive FAQ Accordion**: Immediate clarity on eligibility, language support, and doctor verification.
- **Kerala Heritage Footer**: Emergency numbers (14567, 1056, 108), quick links, and integrated legal modals.

---

### 2. 🏛️ Welfare Rights Engine (നമ്മുടെ അവകാശം)
- **75+ Verified Schemes**: Indira Gandhi Old Age Pension, Disability Pension, Aswasakiranam, Vayomithram, UDID, KASP, etc.
- **5-Step Eligibility Wizard**: Instant match calculation with transparent criteria scoring and celebration confetti.
- **Document Intelligence (OCR)**: Scans Aadhaar, Pink/Yellow PHH Ration Cards, and 40%+ Medical Board Certificates; explains complex jargon (*NPCI Mapping*, *Mustering*, *PHH Category*).
- **Akshaya Application Companion**: Generates official, printable draft forms. Explicitly informs citizens that biometric verification at Akshaya is legally mandatory.
- **Real-Time Tracking**: LSGD application status tracker with deadline countdowns for annual life certificate mustering.

---

### 3. 🩺 Healthcare Companion Engine (വോയ്‌സ് വൈദ്യ)
- **സംസാരിക്കാം (Talk to Vaidya)**: Spoken voice interaction understanding Malayalam and Manglish with animated audio waveforms.
- **കുറിപ്പടി (Prescription OCR)**: Extracts drug names, dosages, timings (1-0-0, 1-0-1), and food relationships. Highlights unclear handwriting without guessing.
- **മരുന്നുകൾ (Smart Medication Reminders)**: Daily schedule (Morning, Noon, Night) with spoken voice reminders and taken/skipped adherence tracking.
- **ഡോക്ടർ സന്ദർശനം (Doctor Visit Assistant)**: Voice symptom recorder that compiles a structured clinical brief and a checklist of questions to ask the doctor.
- **കുടുംബം (Caregiver Connection)**: Secure caregiver connection with granular consent toggles for missed dose SMS alerts.
- **ആരോഗ്യ ചരിത്രം (Medical History & Allergies)**: Chronic disease tracking with prominent **RED-FLAG Drug Allergy Warnings** (Penicillin, Sulfa).
- **Emergency Medical Guardrail**: Instant triage for red-flag symptoms (*chest pain, breathlessness, stroke*) directly linking to **108 Ambulance** and **1056 DISHA Helpline**.

---

### 4. 🔐 3D Kerala Kasavu Gold & Rainforest Authentication
- **Tailored Aesthetics**: Replaced third-party generic templates with Kerala Rainforest Green (`#064e3b` / `#022c22`) and Temple Kasavu Gold (`#d97706` / `#f59e0b`).
- **Interactive Framer Motion 3D Tilt**: Gyroscope and mouse-tracking card perspective with traveling Kasavu Gold light beams.
- **Single Sign-On**: Supports Citizen e-Sevanam SSO and password-based login.

---

## 🛠️ Technology Stack & Architecture

- **Frontend**: React 19, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti.
- **UI System**: shadcn design primitives inside `@/components/ui`, custom spatial grid (8pt).
- **Audio & Speech**: Native Web Speech API (`ml-IN` / `en-IN`), Webkit Speech Recognition, custom audio visualizer waves.
- **Backend API**: Node.js Express server (`server/index.js`) with static production SPA serving, Python FastAPI enclave (`backend-fastapi/`).
- **Data Compliance**: Zero-Client Secrets Enclave, DPDP Act 2023 data minimization.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/AKSHAYKRISHNA012/Nammude-Avakasham.git
cd Nammude-Avakasham

# Install dependencies
npm install

# Build production bundle
npm run build

# Start the full-stack server
npm run server
```

Open **`http://localhost:5000`** (or `http://127.0.0.1:5000`) in your web browser.

---

## 🏛️ Statutory Helplines

| Helpline | Number | Description |
| :--- | :--- | :--- |
| **Elder Line** | `14567` | National Senior Citizen Toll-Free Helpline |
| **DISHA Health** | `1056` | Kerala Government Health Advice & Tele-Triage |
| **Ambulance Emergency** | `108` | Kerala Medical Emergency Services |
| **Social Security Mission** | `1800 120 1001` | Kerala Social Security Mission (KSSM) |

---

## 📄 License & Compliance

© 2026 Nammude Avakasham & VoiceVaidya. Built under Antigravity Pro Swarm protocols.  
Compliant with India's Digital Personal Data Protection (DPDP) Act 2023 and WCAG 2.1 AA accessibility guidelines.
