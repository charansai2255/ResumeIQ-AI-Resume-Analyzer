from sqlalchemy import Column, Integer, ForeignKey, DateTime, JSON
from sqlalchemy.sql import func

from app.database.base import Base


class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id"),
        nullable=False
    )

    ats_score = Column(Integer, nullable=False)

    strengths = Column(JSON, nullable=True)

    weaknesses = Column(JSON, nullable=True)

    missing_skills = Column(JSON, nullable=True)

    suggestions = Column(JSON, nullable=True)

    suitable_roles = Column(JSON, nullable=True)

    interview_questions = Column(JSON, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )