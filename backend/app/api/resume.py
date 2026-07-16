from pathlib import Path
import shutil
import uuid

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.orm import Session


from app.database.session import get_db
from app.auth.oauth2 import get_current_user
from app.models.user import User
from app.models.resume import Resume

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

    # Delete file from disk
    if os.path.exists(resume.file_path):
        os.remove(resume.file_path)

    # Delete from database
    db.delete(resume)
    db.commit()

    return {
        "message": "Resume deleted successfully"
    }