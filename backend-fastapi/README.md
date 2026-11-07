# Nammude Avakasham – FastAPI Backend Service

Production-grade Python FastAPI backend for **Nammude Avakasham (നമ്മുടെ അവകാശം)** – AI Rights Navigator for Senior Citizens and Persons with Disabilities in Kerala.

## Tech Stack
- **Framework**: FastAPI (Asynchronous Python 3.10+)
- **ORM**: SQLAlchemy 2.0 with PostgreSQL / SQLite support
- **AI Integration**: OpenAI GPT-4o / GPT-4o-mini for conversational reasoning and document intelligence
- **OCR Engine**: Tesseract OCR (`pytesseract` + `Pillow`) for scanning Malayalam and English government documents
- **Speech**: Integrates with Malayalam Speech-to-Text and TTS endpoints
- **Data Validation**: Pydantic v2

## Directory Structure
```
backend-fastapi/
├── main.py              # Application entrypoint & CORS setup
├── database.py          # SQLAlchemy PostgreSQL/SQLite engine
├── models.py            # Database tables for schemes & drafts
├── schemas.py           # Request/response validation schemas
├── requirements.txt     # Python dependencies
└── routers/             # API routers for schemes, voice, ocr, applications
```

## Setup & Running
1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set environment variables (optional, in `.env`):
   ```ini
   DATABASE_URL=postgresql://user:password@localhost:5432/nammude_avakasham
   OPENAI_API_KEY=your_openai_key_here
   TESSERACT_CMD=/usr/bin/tesseract
   ```
4. Start the server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 5000 --reload
   ```
5. Interactive OpenAPI docs will be available at:
   - `http://localhost:5000/docs` (Swagger UI)
   - `http://localhost:5000/redoc` (ReDoc)
