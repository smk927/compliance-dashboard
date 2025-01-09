#main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .routers import suppliers
from .database import engine, Base
from .schemas import ComplianceRecordCreate
from datetime import datetime

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Supplier Compliance Monitor API")

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3002",  # Ensure this is included
    "http://127.0.0.1:3002",  # Ensure this is included
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow requests from frontend origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(suppliers.router, prefix="/suppliers", tags=["suppliers"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Supplier Compliance Monitor API"}

# @app.post("/suppliers/check-compliance/")
# async def check_compliance(record: ComplianceRecordCreate):  
#     """
#     Endpoint to check compliance for a supplier.
#     Receives compliance data and returns success message.
#     """
#     try:
#         print(f"Received compliance record: {record}")
#         # Add your actual logic to store the compliance record here
#         return {"status": "compliance check success"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
