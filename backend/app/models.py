#models.py
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    country = Column(String)
    contract_terms = Column(JSON)
    compliance_score = Column(Integer)
    last_audit = Column(Date)
    compliance_records = relationship("ComplianceRecord", back_populates="supplier")

class ComplianceRecord(Base):
    __tablename__ = "compliance_records"

    id = Column(Integer, primary_key=True, index=True)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"))
    metric = Column(String)
    date_recorded = Column(Date, default=datetime.utcnow)
    result = Column(Float)
    status = Column(String)
    supplier = relationship("Supplier", back_populates="compliance_records")
