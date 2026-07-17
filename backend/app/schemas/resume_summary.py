from pydantic import BaseModel


class ResumeSummaryResponse(BaseModel):
    summary: str