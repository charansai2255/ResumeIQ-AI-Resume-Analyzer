from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.auth.oauth2 import get_current_user

from app.models.user import User
from app.models.resume import Resume
from app.models.analysis import Analysis

from app.services.ai_service import analyze_resume

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)


@router.post("/{resume_id}")
def create_analysis(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Get the resume
    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id
    ).first()

    # Check if resume exists
    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    # Analyze resume using Gemini
    result = analyze_resume(resume.parsed_text)

    # Save analysis in database
    analysis = Analysis(
        resume_id=resume.id,
        ats_score=result["ats_score"],
        strengths=result["strengths"],
        weaknesses=result["weaknesses"],
        missing_skills=result["missing_skills"],
        suggestions=result["suggestions"],
        suitable_roles=result["suitable_roles"],
        interview_questions=result["interview_questions"]
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return {
        "message": "Analysis completed successfully",
        "analysis": result
    }