from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy import JSON

from app.database.base import Base


class InterviewQuestions(Base):
    __tablename__ = "interview_questions"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(Integer, ForeignKey("resumes.id"))

    job_role = Column(Text, nullable=True)

    technical_questions = Column(JSON)

    hr_questions = Column(JSON)

    project_questions = Column(JSON)

    coding_questions = Column(JSON)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )