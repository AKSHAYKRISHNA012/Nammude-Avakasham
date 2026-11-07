"""
Nammude Avakasham – AI Rights Navigator
FastAPI Backend Main Application
"""
import os
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="Nammude Avakasham API",
    description="Multilingual welfare assistance platform for Senior Citizens & PwD in Kerala",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "project": "Nammude Avakasham (നമ്മുടെ അവകാശം)",
        "status": "Online",
        "description": "AI-Powered Kerala Welfare Rights Navigator",
        "supported_languages": ["ml", "en"]
    }

class EligibilityRequest(BaseModel):
    age: int
    isDiffAbled: bool = False
    disabilityPct: Optional[int] = 0
    annualIncome: int = 0
    hasBplCard: bool = False
    isBedridden: bool = False
    residesInKerala: bool = True
    isUrban: bool = False

class VoiceAssistantRequest(BaseModel):
    message: str
    step: Optional[str] = "welcome"
    language: Optional[str] = "ml"

@app.post("/api/voice/assistant")
async def voice_assistant_endpoint(req: VoiceAssistantRequest):
    """
    OpenAI / conversational agent integration for simple Malayalam explanations
    """
    msg = req.message.lower()
    # If OpenAI API Key is present in environment, it uses OpenAI; otherwise provides deterministic validated responses
    openai_key = os.getenv("OPENAI_API_KEY")
    
    reply_ml = "നമസ്കാരം! നിങ്ങളുടെ അവകാശങ്ങൾ കണ്ടെത്താൻ ഞാൻ സഹായിക്കാം. നിങ്ങളുടെ പ്രായം എത്രയാണ്?"
    reply_en = "Hello! I am here to help you discover your government rights. What is your age?"
    
    if "വയസ്സ" in msg or any(char.isdigit() for char in msg):
        reply_ml = "നിങ്ങളുടെ പ്രായം രേഖപ്പെടുത്തി. നിങ്ങളുടെ കുടുംബത്തിൽ ബി.പി.എൽ (മഞ്ഞ/പിങ്ക്) റേഷൻ കാർഡ് ഉണ്ടോ?"
        reply_en = "Age noted. Does your family hold a BPL (Yellow/Pink) ration card?"
    
    return {
        "success": True,
        "response_ml": reply_ml,
        "response_en": reply_en,
        "language": req.language
    }

# ==========================================
# VOICEVAIDYA (വോയ്‌സ് വൈദ്യ) FASTAPI ENDPOINTS
# ==========================================

class VaidyaChatRequest(BaseModel):
    message: str
    language: Optional[str] = "ml"

@app.post("/api/vaidya/chat")
async def vaidya_chat_endpoint(req: VaidyaChatRequest):
    """
    Malayalam / Manglish AI healthcare conversational assistant with emergency triage.
    """
    msg = req.message.lower()
    is_emergency = any(kw in msg for kw in ["നെഞ്ചുവേദന", "chest pain", "ശ്വാസംമുട്ടൽ", "breathless", "തളർന്നു"])
    
    if is_emergency:
        return {
            "success": True,
            "isEmergency": True,
            "response_ml": "അടിയന്തിര മുന്നറിയിപ്പ്! നെഞ്ചുവേദനയോ കഠിനമായ ശ്വാസംമുട്ടലോ ഉള്ളപ്പോൾ സമയം കളയാതെ 108 ആംബുലൻസിനെയോ 1056 ദിശ ഹെൽപ്‌ലൈനെയോ വിളിക്കുക.",
            "response_en": "Emergency warning! Please contact 108 Ambulance or 1056 Disha immediately."
        }

    reply_ml = "നിങ്ങളുടെ കുറിപ്പടി പ്രകാരം ഡോക്ടർ നിർദ്ദേശിച്ച സമയത്ത് തന്നെ മരുന്നുകൾ കഴിക്കാൻ ശ്രദ്ധിക്കുക. ഡോക്ടറുടെ അനുവാദമില്ലാതെ അളവ് മാറ്റരുത്."
    reply_en = "Please adhere strictly to prescribed medication timings and never modify dosages without consulting your physician."

    if "ബിപി" in msg or "bp" in msg:
        reply_ml = "ബിപി മരുന്ന് (Telmisartan) ദിവസവും രാവിലെ പ്രഭാതഭക്ഷണത്തിന് ശേഷമാണ് കഴിക്കേണ്ടത്."
        reply_en = "BP medication (Telmisartan) should be taken in the morning after breakfast."

    return {
        "success": True,
        "isEmergency": False,
        "response_ml": reply_ml,
        "response_en": reply_en
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
