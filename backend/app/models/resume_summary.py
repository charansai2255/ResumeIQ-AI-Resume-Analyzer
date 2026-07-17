from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime
from sqlalchemy.sql import func

from app.database.base import Base


class ResumeSummary(Base):
    __tablename__ = "resume_summaries"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(Integer, ForeignKey("resumes.id"))

    summary = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )