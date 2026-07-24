from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.api.auth import get_current_user

from app.models.user import User
from app.models.resume import Resume
from app.models.analysis import Analysis
from app.models.job_analysis import JobAnalysis
from app.models.cover_letter import CoverLetter
from app.models.resume_summary import ResumeSummary
from app.models.interview_questions import InterviewQuestions

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    total_resumes = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).count()

    ats_reports = db.query(Analysis).join(
        Resume,
        Analysis.resume_id == Resume.id
    ).filter(
        Resume.user_id == current_user.id
    ).count()

    job_matches = db.query(JobAnalysis).join(
        Resume,
        JobAnalysis.resume_id == Resume.id
    ).filter(
        Resume.user_id == current_user.id
    ).count()

    cover_letters = db.query(CoverLetter).join(
        Resume,
        CoverLetter.resume_id == Resume.id
    ).filter(
        Resume.user_id == current_user.id
    ).count()

    resume_summaries = db.query(ResumeSummary).join(
        Resume,
        ResumeSummary.resume_id == Resume.id
    ).filter(
        Resume.user_id == current_user.id
    ).count()

    interview_sets = db.query(InterviewQuestions).join(
        Resume,
        InterviewQuestions.resume_id == Resume.id
    ).filter(
        Resume.user_id == current_user.id
    ).count()

    return {
        "total_resumes": total_resumes,
        "ats_reports": ats_reports,
        "job_matches": job_matches,
        "cover_letters": cover_letters,
        "resume_summaries": resume_summaries,
        "interview_sets": interview_sets,
    }
    


@router.get("/recent-activity")
def get_recent_activity(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    activities = []

    # Resume Uploads
    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == current_user.id)
        .all()
    )

    for resume in resumes:
        activities.append({
            "type": "Resume Uploaded",
            "title": resume.filename,
            "created_at": resume.uploaded_at
        })

    # ATS Analysis
    analyses = (
        db.query(Analysis)
        .join(Resume, Analysis.resume_id == Resume.id)
        .filter(Resume.user_id == current_user.id)
        .all()
    )

    for analysis in analyses:
        activities.append({
            "type": "ATS Analysis",
            "title": f"ATS Score: {analysis.ats_score}",
            "created_at": analysis.created_at
        })

    # Job Match
    jobs = (
        db.query(JobAnalysis)
        .join(Resume, JobAnalysis.resume_id == Resume.id)
        .filter(Resume.user_id == current_user.id)
        .all()
    )

    for job in jobs:
        activities.append({
            "type": "Job Match",
            "title": f"Score: {job.match_score}%",
            "created_at": job.created_at
        })

    # Cover Letters
    letters = (
        db.query(CoverLetter)
        .join(Resume, CoverLetter.resume_id == Resume.id)
        .filter(Resume.user_id == current_user.id)
        .all()
    )

    for letter in letters:
        activities.append({
            "type": "Cover Letter",
            "title": letter.company_name,
            "created_at": letter.created_at
        })

    # Resume Summaries
    summaries = (
        db.query(ResumeSummary)
        .join(Resume, ResumeSummary.resume_id == Resume.id)
        .filter(Resume.user_id == current_user.id)
        .all()
    )

    for summary in summaries:
        activities.append({
            "type": "Resume Summary",
            "title": "Summary Generated",
            "created_at": summary.created_at
        })

    # Interview Questions
    interviews = (
        db.query(InterviewQuestions)
        .join(Resume, InterviewQuestions.resume_id == Resume.id)
        .filter(Resume.user_id == current_user.id)
        .all()
    )

    for interview in interviews:
        activities.append({
            "type": "Interview Questions",
            "title": interview.job_role or "General",
            "created_at": interview.created_at
        })

    activities.sort(
        key=lambda x: x["created_at"],
        reverse=True
    )

    return activities[:5]

@router.get("/ats-trend")
def get_ats_trend(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    analyses = (
        db.query(Analysis, Resume)
        .join(Resume, Analysis.resume_id == Resume.id)
        .filter(Resume.user_id == current_user.id)
        .order_by(Analysis.created_at.asc())
        .all()
    )

    data = []

    for analysis, resume in analyses:
        data.append({
            "name": resume.filename,
            "score": analysis.ats_score
        })

    return data