#suppliers.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Supplier, ComplianceRecord
from ..schemas import SupplierCreate, Supplier as SupplierSchema, ComplianceRecordCreate
from ..config import settings
import openai

router = APIRouter()
openai.api_key = settings.openai_api_key

@router.get("/", response_model=List[SupplierSchema])
def get_suppliers(db: Session = Depends(get_db)):
    suppliers = db.query(Supplier).all()
    if not suppliers:
        return []
    return suppliers

@router.post("/", response_model=SupplierSchema)
def create_supplier(supplier: SupplierCreate, db: Session = Depends(get_db)):
    db_supplier = Supplier(**supplier.dict())
    db.add(db_supplier)
    db.commit()
    db.refresh(db_supplier)
    return db_supplier

@router.get("/{supplier_id}/", response_model=SupplierSchema)
def get_supplier(supplier_id: int, db: Session = Depends(get_db)):
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if supplier is None:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return supplier

@router.post("/check-compliance/")
async def check_compliance(
    compliance_data: ComplianceRecordCreate,  # Removed supplier_id from URL params
    db: Session = Depends(get_db)
):
    supplier_id = compliance_data.supplier_id
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")

    compliance_record = ComplianceRecord(
        supplier_id=supplier_id,
        **compliance_data.dict()
    )
    db.add(compliance_record)
    db.commit()

    return {"message": "Compliance record created successfully"}

@router.get("/insights/{supplier_id}/")
async def get_insights(supplier_id: int, db: Session = Depends(get_db)):
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")

    insights = "AI-generated recommendations will be available soon!"  # Placeholder
    return {"insights": insights}
