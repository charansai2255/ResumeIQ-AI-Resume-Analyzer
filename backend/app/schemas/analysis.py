from pydantic import BaseModel
from datetime import datetime


class AnalysisResponse(BaseModel):
    ats_score: int
    strengths: list[str]
    weaknesses: list[str]
    missing_skills: list[str]
    suggestions: list[str]
    suitable_roles: list[str]
    interview_questions: list[str]


class AnalysisDBResponse(AnalysisResponse):
    id: int
    resume_id: int
    created_at: datetime

    class Config:
        from_attributes = True