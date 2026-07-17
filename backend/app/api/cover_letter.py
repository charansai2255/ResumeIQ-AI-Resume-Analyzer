from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.auth.oauth2 import get_current_user

from app.models.user import User
from app.models.resume import Resume
from app.models.cover_letter import CoverLetter

from app.schemas.cover_letter import (
    CoverLetterRequest,
    CoverLetterResponse
)

from app.services.cover_letter_service import generate_cover_letter

router = APIRouter(
    prefix="/cover-letter",
    tags=["Cover Letter"]
)

@router.post("/{resume_id}")
def create_cover_letter(
    resume_id: int,
    request: CoverLetterRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Find the user's resume
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    # Resume not found
    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    # Generate the cover letter
    cover_letter = generate_cover_letter(
        resume_text=resume.parsed_text,
        company_name=request.company_name,
        job_title=request.job_title,
        job_description=request.job_description
    )

    # Save to database
    letter = CoverLetter(
        resume_id=resume.id,
        company_name=request.company_name,
        job_title=request.job_title,
        job_description=request.job_description,
        cover_letter=cover_letter
    )

    db.add(letter)
    db.commit()
    db.refresh(letter)

    # Return the generated text
    return {
        "cover_letter": cover_letter
    }