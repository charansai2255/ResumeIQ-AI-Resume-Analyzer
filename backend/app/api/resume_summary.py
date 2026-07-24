from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.auth.oauth2 import get_current_user

from app.models.user import User
from app.models.resume import Resume
from app.models.resume_summary import ResumeSummary

from app.services.resume_summary_service import generate_resume_summary

router = APIRouter(
    prefix="/resume-summary",
    tags=["Resume Summary"]
)


@router.post("/{resume_id}")
def create_resume_summary(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    summary = generate_resume_summary(resume.parsed_text)

    resume_summary = ResumeSummary(
        resume_id=resume.id,
        summary=summary
    )

    db.add(resume_summary)
    db.commit()
    db.refresh(resume_summary)

    return {
        "message": "Resume summary generated successfully",
        "summary": summary
    }
    

@router.get("/{resume_id}")
def get_resume_summary(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check resume ownership
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    # Get latest generated summary
    resume_summary = (
        db.query(ResumeSummary)
        .filter(
            ResumeSummary.resume_id == resume_id
        )
        .order_by(ResumeSummary.id.desc())
        .first()
    )

    if not resume_summary:
        raise HTTPException(
            status_code=404,
            detail="Resume summary not found"
        )

    return {
        "message": "Resume summary fetched successfully",
        "summary": resume_summary.summary
    }