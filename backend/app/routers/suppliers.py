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
    compliance_data: ComplianceRecordCreate,
    db: Session = Depends(get_db)
):
    try:
        supplier = db.query(Supplier).filter(Supplier.id == compliance_data.supplier_id).first()
        if not supplier:
            raise HTTPException(status_code=404, detail="Supplier not found")

        compliance_record = ComplianceRecord(
            supplier_id=compliance_data.supplier_id,
            metric=compliance_data.metric,
            result=compliance_data.result,
            status=compliance_data.status
        )
        db.add(compliance_record)
        db.commit()
        db.refresh(compliance_record)

        return {"message": "Compliance record created successfully"}
    except Exception as e:
        print(f"Error in check_compliance: {str(e)}")  # For debugging
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/insights/{supplier_id}/")
async def get_insights(supplier_id: int, db: Session = Depends(get_db)):
    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")

    insights = "AI-generated recommendations will be available soon!"  # Placeholder
    return {"insights": insights}

@router.get("/{supplier_id}/compliance-records/")
async def get_compliance_records(
    supplier_id: int,
    db: Session = Depends(get_db)
):
    records = db.query(ComplianceRecord).filter(
        ComplianceRecord.supplier_id == supplier_id
    ).order_by(ComplianceRecord.date_recorded.desc()).all()
    
    return records