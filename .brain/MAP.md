# SYSTEM MAP (Project Brain)
**Project**: Nammude Avakasham & VoiceVaidya
**Architecture**: Unified Dual-Engine (Rights Navigator + Senior Health Companion) with World-Class Landing Page

## Component Topology
```
[Client (React 19 + Tailwind CSS + Framer Motion + shadcn Primitives)]
  │
  ├── 0. Public World-Class Landing Page (LandingPage.jsx)
  │     ├── Section A: Sticky Navigation Bar (Desktop & Mobile Hamburger, ML/EN Switcher, Sign In)
  │     ├── Section B: Hero Section (Headline, Audio Narration, Interactive Preview, Floating Cards)
  │     ├── Section C: Trust & Impact Section (5 Pillars: Citizen Empowerment, Privacy, Accessibility)
  │     ├── Section D: Core Services Section (7 Interactive Cards: Schemes, Wizard, OCR, Tracking, etc.)
  │     ├── Section E: VoiceVaidya Spotlight (Voice AI, Rx OCR, Meds, Caregivers, 108/1056 Disclaimers)
  │     ├── Section F: How It Works (4-Step Illustrated Process with Visual Connectors)
  │     ├── Section G: Accessibility Section (WCAG 2.1 AA, High Contrast AAA, 3x Font Scaling)
  │     ├── Section H: Privacy & Security (DPDP 2023, Zero Secrets, Granular Consent)
  │     ├── Section I: Community Use Cases (Authentic Labeled Sample Profiles: Senior, Caregiver, PwD)
  │     ├── Section J: Interactive FAQ Accordion (7 Core Statutory & Technical Questions)
  │     ├── Section K: Final Call to Action ("Technology Should Work for Everyone")
  │     └── Section L: Comprehensive Footer (Kerala Brand, Quick Links, Helplines, Legal Modals)
  │
  ├── 1. Welfare Rights Engine (നമ്മുടെ അവകാശം)
  │     ├── WelcomeScreen.jsx (Audio Narration & Persona Cards)
  │     ├── Dashboard.jsx (Accessible High-Contrast Tiles & Scheme Matrix)
  │     ├── VoiceAssistant.jsx (Web Speech STT/TTS ml-IN & en-IN)
  │     ├── SchemeDiscovery.jsx (LSGD, KSSM, Sevana, National Social Assistance)
  │     ├── EligibilityAssessment.jsx (5-Step Interactive Wizard + Confetti)
  │     ├── DocumentIntelligence.jsx (OCR + Government Jargon Glossary)
  │     ├── ApplicationCompanion.jsx (Printable Akshaya-Ready Draft Form)
  │     ├── ApplicationTracking.jsx (Milestone Stepper & Mustering Alert)
  │     └── HumanAssistance.jsx (Helplines 14567, 1056, 1800 120 1001)
  │
  ├── 2. Healthcare Companion Engine (വോയ്‌സ് വൈദ്യ)
  │     ├── VoiceVaidyaHome.jsx (6 Core Modules Dashboard)
  │     ├── VaidyaVoiceChat.jsx (Malayalam/Manglish Voice AI + 108 Emergency Alert)
  │     ├── VaidyaPrescriptionOCR.jsx (Prescription Handwriting OCR + Safety Flags)
  │     ├── VaidyaMedicationSchedule.jsx (Smart Voice Reminders, Taken/Skipped Tracking)
  │     ├── VaidyaDoctorVisit.jsx (Symptom Recorder ➔ Clinical Brief ➔ Questions)
  │     ├── VaidyaCaregiver.jsx (Caregiver Sync + Granular Consent Toggles)
  │     └── VaidyaMedicalHistory.jsx (Chronic Conditions + Red Flag Drug Allergies)
  │
  └── 3. Universal Shared Design & Primitives Layer
        ├── Navbar.jsx (Landing, Rights, Vaidya Switcher, High-Contrast, Font Sizing A-/A+)
        ├── components/ui/sign-in-card-2.tsx (3D Kasavu Gold & Rainforest Theme Modal)
        ├── components/ui/demo.tsx (Standalone Demo Container)
        ├── src/lib/utils.ts (shadcn cn helper: clsx + tailwind-merge)
        ├── JargonBusterModal.jsx (Audio Glossary for Official Terms)
        ├── LegalModal.jsx (DPDP Act, Terms, Accessibility Statement, Cookie Preferences)
        ├── utils/speech.js (Web Speech API Wrapper for ml-IN / en-IN)
        ├── data/schemesData.js (Kerala Government Welfare Schemes Directory)
        └── data/vaidyaData.js (Medication Schedules, Prescriptions, Allergies)

[Backend API Server (Node.js Express + Python FastAPI Architecture)]
  ├── /api/schemes (Scheme Directory & Filters)
  ├── /api/eligibility/assess (5-Vector Scoring Engine)
  ├── /api/voice/assistant (Rights Conversational AI)
  ├── /api/documents/analyze (Certificate OCR & Field Parser)
  ├── /api/applications/draft (Akshaya-Format Draft Generator)
  ├── /api/tracking/:ref (LSGD Application Tracker)
  ├── /api/vaidya/chat (Healthcare AI with Emergency Triage)
  ├── /api/vaidya/prescriptions/analyze (Prescription OCR)
  ├── /api/vaidya/medications (Daily Schedule & Adherence Logs)
  ├── /api/vaidya/caregivers (Caregiver Sync & Consent)
  └── /api/vaidya/medical-history (Chronic Conditions & Allergies)
```
