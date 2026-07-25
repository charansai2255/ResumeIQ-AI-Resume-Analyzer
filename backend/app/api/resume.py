from pathlib import Path
import shutil
import uuid

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.orm import Session


from app.database.session import get_db
from app.auth.oauth2 import get_current_user
from app.models.user import User
from app.models.resume import Resume
from app.models.analysis import Analysis
from app.models.cover_letter import CoverLetter
from app.models.job_analysis import JobAnalysis
from app.models.resume_summary import ResumeSummary
from app.models.interview_questions import InterviewQuestions

from app.schemas.resume import ResumeResponse
import os

from app.services.parser import parse_resume

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    allowed_types = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF and DOCX files are allowed."
        )

    extension = Path(file.filename).suffix

    unique_filename = f"{uuid.uuid4()}{extension}"

    file_path = UPLOAD_DIR / unique_filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    parsed_text = parse_resume(str(file_path))

    resume = Resume(
    filename=file.filename,
    file_path=str(file_path),
    file_type=file.content_type,
    parsed_text=parsed_text,
    user_id=current_user.id
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume uploaded successfully",
        "resume_id": resume.id,
        "filename": resume.filename
    }

@router.get("", response_model=list[ResumeResponse])
def get_resumes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .order_by(Resume.uploaded_at.desc())
        .all()
    )

    return resumes

@router.get("/{resume_id}/text")
def get_resume_text(
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
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found"
        )

    return {
        "filename": resume.filename,
        "parsed_text": resume.parsed_text
    }

@router.delete("/{resume_id}")
def delete_resume(
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

    # Delete all related child records first (avoid FK constraint violations)
    db.query(Analysis).filter(Analysis.resume_id == resume_id).delete()
    db.query(CoverLetter).filter(CoverLetter.resume_id == resume_id).delete()
    db.query(JobAnalysis).filter(JobAnalysis.resume_id == resume_id).delete()
    db.query(ResumeSummary).filter(ResumeSummary.resume_id == resume_id).delete()
    db.query(InterviewQuestions).filter(InterviewQuestions.resume_id == resume_id).delete()

    # Delete file from disk (resolve absolute path safely)
    try:
        file_path = Path(resume.file_path)
        if not file_path.is_absolute():
            file_path = Path(__file__).parent.parent.parent / file_path
        if file_path.exists():
            file_path.unlink()
    except Exception:
        pass  # Don't fail if file is already missing

    # Delete resume from database
    db.delete(resume)
    db.commit()

    return {
        "message": "Resume deleted successfully"
    }