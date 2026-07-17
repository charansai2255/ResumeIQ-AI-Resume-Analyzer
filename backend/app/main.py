from fastapi import FastAPI
from app.database.base import Base
from app.database.connection import engine

# Import models
from app.models import User , Resume

from app.models.analysis import Analysis

# Import routers
from app.api.auth import router as auth_router

from app.api.resume import router as resume_router

from app.services.ai_service import analyze_resume

from app.api.analysis import router as analysis_router

from app.api.job_analysis import router as job_analysis_router

from app.api.cover_letter import router as cover_letter_router

from app.api.resume_summary import router as resume_summary_router

Base.metadata.create_all(bind=engine)


app = FastAPI(title="ResumeIQ API")

app.include_router(auth_router)

app.include_router(resume_router)

app.include_router(analysis_router)

app.include_router(job_analysis_router)

app.include_router(cover_letter_router)

app.include_router(resume_summary_router)

@app.get("/")
def home():
    return {"message": "ResumeIQ Backend Running 🚀"}

@app.get("/ai-test")
def ai_test():

    result = analyze_resume("""
Python Developer

Skills

Python
FastAPI
React
SQL

Projects

AI Resume Analyzer
""")

    return result
