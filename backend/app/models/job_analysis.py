from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy import JSON

from app.database.base import Base


class JobAnalysis(Base):
    __tablename__ = "job_analysis"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(Integer, ForeignKey("resumes.id"))

    job_description = Column(Text)

    match_score = Column(Integer)

    matching_skills = Column(JSON)

    missing_skills = Column(JSON)

    strengths = Column(JSON)

    weaknesses = Column(JSON)

    suggestions = Column(JSON)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )