#schemas.py
from pydantic import BaseModel
from typing import List
from datetime import date

# Base compliance record model
class ComplianceRecordBase(BaseModel):
    metric: str
    result: float
    status: str

# Model to create a compliance record
class ComplianceRecordCreate(ComplianceRecordBase):
    supplier_id: int

# Model for a compliance record (with all fields from DB)
class ComplianceRecord(ComplianceRecordBase):
    id: int
    supplier_id: int
    date_recorded: date

    class Config:
        orm_mode = True  # Ensures compatibility with SQLAlchemy models

# Supplier base model
class SupplierBase(BaseModel):
    name: str
    country: str
    compliance_score: int
    last_audit: date
    contract_terms: str 

# Model to create a supplier
class SupplierCreate(SupplierBase):
    pass

# Model for a supplier (with compliance records)
class Supplier(SupplierBase):
    id: int
    compliance_records: List[ComplianceRecord] = []

    class Config:
        orm_mode = True  # Ensures compatibility with SQLAlchemy models
