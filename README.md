# ResumeIQ

ResumeIQ is an AI-powered resume analysis platform that helps job seekers review and improve their resumes. The application supports resume upload and parsing, ATS-style analysis, job description matching, cover letter generation, interview question generation, and resume summary generation.

## Overview

ResumeIQ is built as a full-stack application with:

- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI + SQLAlchemy
- Database: PostgreSQL (via SQLAlchemy engine configuration)
- AI: Gemini-powered analysis and content generation
- Auth: JWT-based user authentication

## Current Features

- User authentication and protected API routes
- Resume upload for PDF and DOCX files
- Resume parsing and storage
- ATS-style analysis with strengths, weaknesses, missing skills, and suggestions
- Job analysis and match scoring against a job description
- Cover letter generation for a target company and role
- Interview question generation
- Resume summary generation

## Project Structure

- backend/app: FastAPI application, routers, services, models, schemas, auth, database setup
- frontend/src: React application entry points and UI components
- uploads: uploaded resume files are stored here during processing

## Environment Variables

Create a .env file in the backend directory with at least the following values:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-flash-latest
```

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API documentation will be available at:

- http://127.0.0.1:8000/docs
- http://127.0.0.1:8000/redoc

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will usually run at http://localhost:5173.

## Development Notes

- Backend routes are organized by feature under backend/app/api.
- AI-powered services live under backend/app/services.
- Resume files are saved in the uploads folder and linked to the user record in the database.

## Status

This repository currently includes the backend API structure and a React/Vite frontend scaffold, with core resume analysis and generation workflows implemented in the backend.