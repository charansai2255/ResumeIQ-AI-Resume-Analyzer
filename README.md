# ResumeIQ – AI-Powered Resume Analyzer

ResumeIQ is a full-stack AI-powered resume analysis and career assistance platform designed to help job seekers evaluate, improve, and tailor their resumes.

Users can upload resumes, analyze ATS compatibility, compare resumes against job descriptions, generate personalized cover letters, create resume summaries, and prepare for interviews using AI-generated questions.

## Live Application

**Live Demo:**  
https://resume-iq-ai-resume-analyzer-2fthpshrw-charansai04s-projects.vercel.app/

The frontend is deployed on **Vercel**, while the FastAPI backend is hosted on **Render** with a PostgreSQL database.

---

## Features

### Authentication

- User registration and login
- JWT-based authentication
- Protected frontend routes
- Protected FastAPI endpoints
- User profile
- Secure logout functionality

### Resume Management

- Upload PDF and DOCX resumes
- Extract and parse resume content
- Store resume information in PostgreSQL
- Resume history
- User-specific resume management

### ATS Resume Analysis

Analyze a resume using AI and receive:

- ATS score
- Resume strengths
- Resume weaknesses
- Missing skills
- Improvement suggestions
- Suitable job roles
- Interview preparation insights

### Job Match Analysis

Compare a resume against a job description and generate:

- Match score
- Matching skills
- Missing skills
- Strengths
- Weaknesses
- Improvement suggestions

### AI Cover Letter Generator

Generate personalized cover letters based on:

- Resume
- Company name
- Job title
- Job description

### Resume Summary Generator

Generate a concise professional summary based on the uploaded resume.

### Interview Question Generator

Generate interview preparation questions including:

- Technical questions
- HR questions
- Project-based questions
- Coding questions

### Dashboard

The ResumeIQ dashboard provides:

- Total resumes
- ATS analyses
- Job matches
- Cover letters generated
- Resume summaries generated
- Interview question sets
- Recent activity
- ATS score trends
- Quick access to ResumeIQ features

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Lucide React
- React Hot Toast

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- REST APIs

### Database

- PostgreSQL
- Neon PostgreSQL

### AI

- Google Gemini API
- Gemini models for resume analysis and content generation

### Resume Processing

- PyMuPDF for PDF parsing
- python-docx for DOCX processing

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Neon PostgreSQL

---

## Architecture

```text
User
 │
 ▼
React + Vite Frontend
 │
 │ REST API / JWT
 ▼
FastAPI Backend
 │
 ├──────────────► Google Gemini API
 │
 ▼
PostgreSQL / Neon
```

---

## Project Structure

```text
ResumeIQ/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── config/
│   │   ├── core/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── uploads/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── routes/
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## Local Development

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd ResumeIQ
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

Windows:

```bash
venv\Scripts\activate
```

macOS/Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create:

```text
backend/.env
```

Add:

```env
DATABASE_URL=your-postgresql-database-url
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=your-supported-gemini-model
```

Start FastAPI:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

ReDoc:

```text
http://127.0.0.1:8000/redoc
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## Production Configuration

The production frontend uses the deployed FastAPI backend through:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

The backend should allow the deployed frontend domain through CORS.

Sensitive values such as database credentials, JWT secrets, and Gemini API keys should be configured through environment variables and must not be committed to GitHub.

---

## API Documentation

FastAPI automatically provides interactive API documentation.

After starting the backend locally:

```text
http://127.0.0.1:8000/docs
```

The API includes endpoints for:

- Authentication
- Resume management
- ATS analysis
- Job matching
- Cover letter generation
- Resume summaries
- Interview questions
- Dashboard data
- User profile

---

## Security

ResumeIQ implements:

- JWT authentication
- Password hashing
- Protected API endpoints
- User-specific resources
- Environment-based secret management
- CORS configuration
- Authentication-aware frontend routes

---

## Future Improvements

Potential improvements include:

- Password change and password recovery
- Resume recommendations based on target roles
- Multiple resume versions
- Improved ATS analytics and visualizations
- Resume comparison
- Export generated cover letters
- Enhanced interview preparation
- Improved mobile responsiveness

---

## Status

**ResumeIQ is deployed and functional.**

Core workflows currently include:

**Upload Resume → ATS Analysis → Job Match → Cover Letter → Resume Summary → Interview Questions**

---

## Author

**Charan Sai Macha**

Full-Stack Developer | Python | FastAPI | React | AI Integration
