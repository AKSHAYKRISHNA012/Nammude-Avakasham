# DECISIONS.md – Architecture Decision Records (ADR)
**Project**: Nammude Avakasham & VoiceVaidya
**Harness**: Antigravity Pro Council Deliberation

---

## ADR 001: Dual-Engine Architecture (Rights Navigator + Healthcare Companion)
- **Context**: Users required both government welfare rights discovery (Nammude Avakasham) and Malayalam healthcare assistance (VoiceVaidya).
- **Decision**: Unified under a single reactive frontend with dynamic glassmorphic mode switching.
- **Consequences**: Shared speech synthesis layer (`ml-IN`), common accessibility toolbar, and unified state storage.

## ADR 002: Zero-Client Secrets & In-Memory Enclave
- **Context**: Government pension and healthcare data involves sensitive PII (Aadhaar, income, prescriptions).
- **Decision**: Zero client-side API keys or database tokens. All external API routing and document processing are handled server-side via Node/Express and FastAPI middleware.
- **Consequences**: Complete immunity from client credential leakage.

## ADR 003: Deterministic Safety Guardrails on Healthcare & Government Claims
- **Context**: Hallucination risks in LLMs regarding dosages or scheme eligibility.
- **Decision**: 
  1. The platform **never independently modifies dosages** or diagnoses diseases.
  2. Red-flag symptoms (*chest pain, breathlessness, stroke*) immediately trigger **108/1056 emergency dialers**.
  3. The platform **never claims an application is officially submitted to the government** without biometric Akshaya authentication.
- **Consequences**: Legal safety, statutory compliance with Kerala LSGD and medical ethics.

## ADR 004: Native Web Speech API over Heavy Third-Party Cloud SDKs
- **Context**: Elderly users need zero-latency voice interaction on standard Android and desktop browsers.
- **Decision**: Implemented native `window.speechSynthesis` and `webkitSpeechRecognition` with Malayalam phonetic mappings and audio visualizer wave feedback.
- **Consequences**: Zero latency, zero per-minute billing, 100% offline capability where supported.
