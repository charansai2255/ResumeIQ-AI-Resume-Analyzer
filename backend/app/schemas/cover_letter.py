from pydantic import BaseModel


class CoverLetterRequest(BaseModel):
    company_name: str
    job_title: str
    job_description: str


class CoverLetterResponse(BaseModel):
    cover_letter: str