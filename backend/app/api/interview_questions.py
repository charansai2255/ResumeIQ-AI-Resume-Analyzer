from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.auth.oauth2 import get_current_user

from app.models.user import User
from app.models.resume import Resume
from app.models.interview_questions import InterviewQuestions

from app.schemas.interview_questions import (
    InterviewQuestionRequest,
    InterviewQuestionResponse,
)

from app.services.interview_question_service import (
    generate_interview_questions,
)

router = APIRouter(
    prefix="/interview-questions",
    tags=["Interview Questions"]
)


@router.post("/{resume_id}")
def create_interview_questions(
    resume_id: int,
    request: InterviewQuestionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Check if resume exists and belongs to current user
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

    # Optional: Return existing interview questions if already generated
    existing_questions = (
        db.query(InterviewQuestions)
        .filter(
            InterviewQuestions.resume_id == resume.id,
            InterviewQuestions.job_role == request.job_role
        )
        .first()
    )

    if existing_questions:
        return {
            "message": "Interview questions already exist",
            "interview_questions": {
                "technical_questions": existing_questions.technical_questions,
                "hr_questions": existing_questions.hr_questions,
                "project_questions": existing_questions.project_questions,
                "coding_questions": existing_questions.coding_questions,
            },
        }

    # Generate interview questions using AI
    result = generate_interview_questions(
        resume.parsed_text,
        request.job_role,
    )

    # Save to database
    interview_questions = InterviewQuestions(
        resume_id=resume.id,
        job_role=request.job_role,
        technical_questions=result["technical_questions"],
        hr_questions=result["hr_questions"],
        project_questions=result["project_questions"],
        coding_questions=result["coding_questions"],
    )

    db.add(interview_questions)
    db.commit()
    db.refresh(interview_questions)

    return {
        "message": "Interview questions generated successfully",
        "interview_questions": result,
    }


@router.get("/{resume_id}")
def get_interview_questions(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Check resume ownership
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == current_user.id,
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    questions = (
        db.query(InterviewQuestions)
        .filter(InterviewQuestions.resume_id == resume.id)
        .order_by(InterviewQuestions.created_at.desc())
        .all()
    )

    if not questions:
        raise HTTPException(
            status_code=404,
            detail="No interview questions found",
        )

    return {
        "message": "Interview questions fetched successfully",
        "count": len(questions),
        "data": questions,
    }