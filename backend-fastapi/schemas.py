"""
Pydantic Schemas for Validation
"""
from pydantic import BaseModel, Field
from typing import List, Optional

class EligibilityInput(BaseModel):
    age: int = Field(..., ge=0, le=120)
    isDiffAbled: bool = False
    disabilityPct: Optional[int] = 0
    annualIncome: int = 0
    hasBplCard: bool = False
    isBedridden: bool = False
    residesInKerala: bool = True
    isUrban: bool = False

class VoiceInput(BaseModel):
    message: str
    step: Optional[str] = "welcome"
    language: Optional[str] = "ml"

class ApplicationDraftInput(BaseModel):
    schemeId: str
    fullName: str
    age: int
    gender: Optional[str] = "Male"
    phone: str
    aadhaarMasked: str
    rationCardNo: str
    district: str
    localBody: str
    wardNo: str
    address: str
    bankName: str
    accountNoMasked: str
    ifscCode: str
