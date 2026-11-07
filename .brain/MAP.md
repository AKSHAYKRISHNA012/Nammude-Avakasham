# SYSTEM MAP (Project Brain)
**Project**: Nammude Avakasham & VoiceVaidya
**Architecture**: Unified Dual-Engine (Rights Navigator + Senior Health Companion)

## Component Topology
```
[Client (React 19 + Tailwind CSS)]
  │
  ├── 1. Welfare Rights Engine (നമ്മുടെ അവകാശം)
  │     ├── WelcomeScreen.jsx (Audio Narration & Persona Cards)
  │     ├── Dashboard.jsx (Accessible High-Contrast Tiles)
  │     ├── VoiceAssistant.jsx (Web Speech STT/TTS ml-IN & en-IN)
  │     ├── SchemeDiscovery.jsx (LSGD, KSSM, Sevana, UDID Schemes)
  │     ├── EligibilityAssessment.jsx (5-Step Wizard + Confetti)
  │     ├── DocumentIntelligence.jsx (OCR + Government Jargon Buster)
  │     ├── ApplicationCompanion.jsx (Printable Akshaya Draft Form)
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
  └── 3. Universal Shared Layer
        ├── Navbar.jsx (Dual-Mode Switcher, High-Contrast, Font Sizing A-/A+, Jargon Modal)
        ├── JargonBusterModal.jsx (Audio Glossary for Official Terms)
        ├── utils/speech.js (Web Speech API Wrapper for ml-IN / en-IN)
        ├── data/schemesData.js (Kerala Government Welfare Schemes)
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
