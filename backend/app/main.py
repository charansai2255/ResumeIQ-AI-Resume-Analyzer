from fastapi import FastAPI
from app.database.base import Base
from app.database.connection import engine

# Import models
from app.models import User , Resume

# Import routers
from app.api.auth import router as auth_router

from app.api.resume import router as resume_router


Base.metadata.create_all(bind=engine)



app = FastAPI(title="ResumeIQ API")

app.include_router(auth_router)

from app.api.resume import router as resume_router

app.include_router(resume_router)

@app.get("/")
def home():
    return {"message": "ResumeIQ Backend Running 🚀"}