from fastapi import FastAPI
from app.database.base import Base
from app.database.connection import engine

# Import models
from app.models import User , Resume

# Import routers
from app.api.auth import router as auth_router

from app.api.resume import router as resume_router

from app.services.ai_service import analyze_resume

from app.services.ai_service import client

Base.metadata.create_all(bind=engine)



app = FastAPI(title="ResumeIQ API")

app.include_router(auth_router)


app.include_router(resume_router)

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

@app.get("/models")
def list_models():
    models = client.models.list()
    return [model.name for model in models]