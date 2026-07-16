from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.auth.oauth2 import get_current_user

from app.models.user import User
from app.models.resume import Resume
from app.models.analysis import Analysis

from app.services.ai_service import analyze_resume
from app.schemas.analysis import AnalysisDBResponse

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

    # Check if analysis already exists
    existing_analysis = (
        db.query(Analysis)
        .filter(Analysis.resume_id == resume.id)
        .first()
    )

    if existing_analysis:
        return {
    "message": "Analysis already exists",
    "analysis": {
        "id": existing_analysis.id,
        "resume_id": existing_analysis.resume_id,
        "ats_score": existing_analysis.ats_score,
        "strengths": existing_analysis.strengths,
        "weaknesses": existing_analysis.weaknesses,
        "missing_skills": existing_analysis.missing_skills,
        "suggestions": existing_analysis.suggestions,
        "suitable_roles": existing_analysis.suitable_roles,
        "interview_questions": existing_analysis.interview_questions,
        "created_at": existing_analysis.created_at
    }
}

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


@router.get("/{resume_id}", response_model=AnalysisDBResponse)
def get_analysis(
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

    analysis = (
        db.query(Analysis)
        .filter(Analysis.resume_id == resume.id)
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    return analysis