from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.auth.oauth2 import get_current_user

from app.models.user import User
from app.models.resume import Resume
from app.models.job_analysis import JobAnalysis

from app.schemas.job_analysis import JobAnalysisRequest
from app.services.job_ai_service import analyze_job_match

router = APIRouter(
    prefix="/job-analysis",
    tags=["Job Analysis"]
)


@router.post("/{resume_id}")
def analyze_job(
    resume_id: int,
    request: JobAnalysisRequest,
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

    result = analyze_job_match(
        resume.parsed_text,
        request.job_description
    )

    analysis = JobAnalysis(
        resume_id=resume.id,
        job_description=request.job_description,
        match_score=result["match_score"],
        matching_skills=result["matching_skills"],
        missing_skills=result["missing_skills"],
        strengths=result["strengths"],
        weaknesses=result["weaknesses"],
        suggestions=result["suggestions"]
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return {
        "message": "Job analysis completed successfully",
        "analysis": result
    }
    
@router.get("/{resume_id}")
def get_job_analysis(
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

    # Get latest analysis
    analysis = (
        db.query(JobAnalysis)
        .filter(JobAnalysis.resume_id == resume_id)
        .order_by(JobAnalysis.id.desc())
        .first()
    )

    if not analysis:
        raise HTTPException(
            status_code=404,
            detail="Job analysis not found"
        )

    return {
        "message": "Job analysis fetched successfully",
        "analysis": {
            "match_score": analysis.match_score,
            "matching_skills": analysis.matching_skills,
            "missing_skills": analysis.missing_skills,
            "strengths": analysis.strengths,
            "weaknesses": analysis.weaknesses,
            "suggestions": analysis.suggestions,
        },
    }