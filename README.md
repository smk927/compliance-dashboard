# Compliance Management System

This project is a full-stack application for managing supplier compliance data, built with a **React frontend** and a **FastAPI backend**. It allows users to create suppliers, upload compliance data, and view AI-generated compliance insights.

---

## Requirements

### Frontend
- Node.js (v14+)
- npm or yarn

### Backend
- Python 3.9+
- PostgreSQL

---

## Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/smk927/compliance-dashboard
cd <project-directory>
```

### Step 2: Backend Setup

1. **Navigate to the backend folder:**
```bash
cd backend
```

2. **Create a virtual environment and activate it:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables:**
Create a `.env` file in the `backend` folder with the following content:
```env
DATABASE_URL=postgresql://username:password@localhost/dbname
OPENAI_API_KEY=your_openai_api_key
```
Replace `username`, `password`, and `dbname` with your PostgreSQL credentials.

5. **Run the FastAPI application:**
```bash
uvicorn app.main:app --reload
```

6. **Access the API:**
   * API Docs: `http://127.0.0.1:8000/docs`
   * ReDoc: `http://127.0.0.1:8000/redoc`

### Step 3: Frontend Setup

1. **Navigate to the frontend folder:**
```bash
cd ../frontend
```

2. **Install dependencies:**
```bash
npm install  # or yarn install
```

3. **Run the React development server:**
```bash
npm start  # or yarn start
```

4. **Access the frontend application:**
Open your browser and go to `http://localhost:3000`

## Notes
* Ensure PostgreSQL is running, and the database is created before starting the backend.
* Replace placeholders like `<repository-url>` and `your_openai_api_key` with your actual values.
* The backend API must be running before interacting with the frontend.

That's it! Your Compliance Management System should now be up and running.