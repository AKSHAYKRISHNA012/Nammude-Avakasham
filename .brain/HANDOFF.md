# HANDOFF.md – Engineering Session State
**Project**: Nammude Avakasham & VoiceVaidya
**Git Remote**: `https://github.com/AKSHAYKRISHNA012/Nammude-Avakasham.git`
**Branch**: `main`

---

## 1. Runtime Environment
- **Live Server**: Node.js Express serving API and production SPA at `http://127.0.0.1:5000`
- **FastAPI Backend Enclave**: Available in `backend-fastapi/` for enterprise PostgreSQL deployment
- **Frontend Build**: Vite production bundle in `dist/` (751 kB JS, 5.3 kB HTML)

## 2. Active Endpoints & Routes
- `/` (Comprehensive Landing Page with seamless mode switching to Welfare Rights and VoiceVaidya)
- `/api/schemes` (List & filter verified Kerala welfare schemes)
- `/api/eligibility/assess` (5-vector eligibility scoring)
- `/api/voice/assistant` (Welfare Rights voice Q&A)
- `/api/documents/analyze` (Aadhaar, Ration Card, Medical Board OCR)
- `/api/applications/draft` (Akshaya-ready draft generation)
- `/api/tracking/:ref` (LSGD application status stepper)
- `/api/vaidya/chat` (VoiceVaidya medical voice triage & assistant)
- `/api/vaidya/prescriptions/analyze` (Prescription OCR)
- `/api/vaidya/medications` (Active schedules & daily adherence)
- `/api/vaidya/medications/log` (Taken/skipped logging + caregiver SMS trigger)
- `/api/vaidya/caregivers` (Caregiver permissions & consent)
- `/api/vaidya/medical-history` (Chronic conditions & drug allergies)

## 3. Maintenance Procedures
- To rebuild frontend: `npm run build`
- To run server: `npm run server`
- To run dev server: `npm run dev`
