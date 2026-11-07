"""
SQLAlchemy Database Models for Schemes, Draft Applications, and Tracking
"""
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Float, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(String(50), primary_key=True, index=True)
    name_ml = Column(String(255), nullable=False)
    name_en = Column(String(255), nullable=False)
    category = Column(String(50), index=True)
    department_ml = Column(String(255))
    department_en = Column(String(255))
    target_group_ml = Column(Text)
    target_group_en = Column(Text)
    benefit_ml = Column(Text)
    benefit_en = Column(Text)
    monthly_amount = Column(Integer, default=0)
    min_age = Column(Integer, default=0)
    max_income = Column(Integer, default=100000)
    requires_disability = Column(Boolean, default=False)
    min_disability_pct = Column(Integer, default=0)
    official_link = Column(String(500))
    source_reference = Column(String(255))
    last_verified = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ApplicationDraft(Base):
    __tablename__ = "application_drafts"

    ref_number = Column(String(100), primary_key=True, index=True)
    scheme_id = Column(String(50), ForeignKey("schemes.id"))
    full_name = Column(String(255), nullable=False)
    age = Column(Integer)
    phone = Column(String(20))
    aadhaar_masked = Column(String(30))
    ration_card_no = Column(String(50))
    district = Column(String(100))
    local_body = Column(String(255))
    ward_no = Column(String(20))
    address = Column(Text)
    bank_name = Column(String(255))
    account_no_masked = Column(String(50))
    ifsc_code = Column(String(30))
    status = Column(String(50), default="DRAFT_READY")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
