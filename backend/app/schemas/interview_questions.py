from pydantic import BaseModel
from typing import Optional


class InterviewQuestionRequest(BaseModel):
    job_role: Optional[str] = None


class InterviewQuestionResponse(BaseModel):
    technical_questions: list[str]
    hr_questions: list[str]
    project_questions: list[str]
    coding_questions: list[str]