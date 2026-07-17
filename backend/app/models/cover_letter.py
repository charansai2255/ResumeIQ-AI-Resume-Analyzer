from sqlalchemy import Column, Integer, ForeignKey, Text, DateTime
from sqlalchemy.sql import func

from app.database.base import Base


class CoverLetter(Base):
    __tablename__ = "cover_letters"

    id = Column(Integer, primary_key=True, index=True)

    resume_id = Column(Integer, ForeignKey("resumes.id"))

    company_name = Column(Text)

    job_title = Column(Text)

    job_description = Column(Text)

    cover_letter = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )