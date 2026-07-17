from pydantic import BaseModel

class JobAnalysisRequest(BaseModel):
    job_description: str


class JobAnalysisResponse(BaseModel):
    match_score: int
    matching_skills: list[str]
    missing_skills: list[str]
    strengths: list[str]
    weaknesses: list[str]
    suggestions: list[str]