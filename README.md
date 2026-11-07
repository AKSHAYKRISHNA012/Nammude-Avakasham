# നമ്മുടെ അവകാശം (Nammude Avakasham) & വോയ്‌സ് വൈദ്യ (VoiceVaidya)
### AI Rights Navigator & Malayalam Healthcare Companion for Senior Citizens in Kerala

A unified, voice-first, accessible platform empowering Senior Citizens and Persons with Disabilities in Kerala to understand their welfare rights, claim benefits, manage medications, understand prescriptions, and communicate with doctors.

---

## 🩺 Newly Integrated: VoiceVaidya (വോയ്‌സ് വൈദ്യ)

**VoiceVaidya** is a dedicated Malayalam-speaking AI healthcare companion built specifically for the elderly population in Kerala:

1. **സംസാരിക്കാം (Talk to Vaidya - Voice Assistant)**:
   - Understands Malayalam and Manglish naturally (e.g. *"എനിക്ക് ബിപി മരുന്ന് രാവിലെയാണോ രാത്രിയാണോ കഴിക്കേണ്ടത്?"*).
   - Large microphone button with animated audio wave pulses.
   - Replay audio response anytime with Malayalam speech synthesis.
   - **Emergency Medical Guardrail**: Detects red-flag symptoms (chest pain, breathlessness, stroke signs) and immediately shows emergency warnings with direct links to 108 Ambulance and 1056 Disha Health Helpline.

2. **കുറിപ്പടി (Prescription Understanding OCR)**:
   - Upload or photograph doctor prescriptions.
   - AI extracts medicine names, dosages, frequencies (1-0-0, 1-0-1), food relationship (ഭക്ഷണത്തിന് ശേഷം/മുമ്പ്), and duration.
   - Clear flags for unreadable handwriting with explicit warnings: *"Verify with your doctor or pharmacist"*.
   - Never guesses missing medicine names or dosages.
   - One-click action: *"ഈ മരുന്നുകൾ എൻ്റെ സമയപ്പട്ടികയിലേക്ക് ചേർക്കുക (Add to My Schedule)"*.

3. **മരുന്നുകൾ (Smart Medication Reminders & Adherence)**:
   - Morning (രാവിലെ), Afternoon (ഉച്ചക്ക്), and Night (രാത്രി) schedules.
   - Spoken Malayalam voice reminders: *"ശ്രീധരൻ ചേട്ടാ, പ്രഭാതഭക്ഷണത്തിന് ശേഷം ബിപി മരുന്ന് കഴിക്കാൻ സമയമായി!"*.
   - One-touch "കഴിച്ചു ✓ (Taken)" and "ഒഴിവാക്കി ✗ (Skipped)" tracking with adherence scoring.

4. **ഡോക്ടർ സന്ദർശനം (Doctor Visit Assistant)**:
   - Senior speaks their symptoms in Malayalam.
   - Generates a structured clinical brief (Chief Complaints, Duration, Current Medications, Key Vitals).
   - Generates a checklist of *"Questions to Ask the Doctor (ഡോക്ടറോട് ചോദിക്കേണ്ട ചോദ്യങ്ങൾ)"*.
   - Printable & shareable for hospital visits.

5. **കുടുംബം (Caregiver Connection & Consent)**:
   - Connects trusted family member (e.g., Rahul Nair, Son).
   - Granular privacy & consent controls: (1) Missed dose alert notifications, (2) Permission for caregiver to upload prescriptions remotely, (3) Doctor visit summaries.
   - Real-time notification feed when doses are skipped.

6. **ആരോഗ്യ ചരിത്രം (Health History & Allergies)**:
   - Chronic disease tracking (Hypertension, Diabetes, Osteoarthritis).
   - Prominent **RED-FLAG Drug Allergy Warnings** (Penicillin, Sulfa drugs) to show attending doctors.
   - History of past consultations and exportable medical summary.

---

## 🏛️ Platform 1: Nammude Avakasham (Welfare Rights Navigator)

- **AI Scheme Discovery**: Verified Kerala & Central schemes (*Indira Gandhi Old Age Pension*, *Disability Pension*, *Aswasakiranam*, *Vayomithram*, *UDID*, and *KASP*).
- **5-Step Eligibility Wizard**: Instant match calculation with celebration confetti.
- **Document Intelligence**: Scans Aadhaar, BPL Ration Cards, and Medical Board certificates, explaining terms like *NPCI Mapping*, *PHH*, and *Benchmark Disability*.
- **Application Companion**: Generates official, printable Akshaya drafts. **Explicitly informs citizens that biometric verification at Akshaya is legally mandatory.**
- **Application Tracking**: Milestone progress tracker and annual mustering reminders.
- **Helplines**: Toll-free direct dialers for Elder Line 14567, Disha 1056, and KSSM 1800 120 1001.

---

## 🚀 How to Run the Platform

```powershell
cd "C:\Users\Akshay krishna\.gemini\antigravity\scratch\nammude-avakasham"

# Run the complete application (Frontend + Express API Server)
npm run server
```
Open **`http://127.0.0.1:5000`** in your browser.

Use the top navigation bar to toggle between:
- 🌴 **ക്ഷേമ അവകാശങ്ങൾ (Welfare Rights Navigator)**
- 🩺 **വോയ്‌സ് വൈദ്യ (VoiceVaidya Healthcare Companion)**
