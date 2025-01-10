# FastAPI Project Setup

## Requirements

- Python 3.9+
- PostgreSQL

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd <project_directory>
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

   Create a `.env` file with the following content:

   ```env
   DATABASE_URL=postgresql://username:password@localhost/dbname
   OPENAI_API_KEY=your_openai_api_key
   ```

5. **Run the application:**

   ```bash
   uvicorn app.main:app --reload
   ```

## Notes

- Ensure PostgreSQL is running and the database is created.
- Replace `username`, `password`, and `dbname` in `DATABASE_URL` with your actual credentials.
- Replace `<repository_url>` with your repository's URL.

That's it! Your FastAPI project should now be up and running.
