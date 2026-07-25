import os
import json
from dotenv import load_dotenv
from app.services.ai_service import client

load_dotenv()


def generate_interview_questions(resume_text: str, job_role: str | None):

    MODEL = os.getenv("GEMINI_MODEL")

    prompt = f"""
You are an experienced technical interviewer.

Based on the resume and job role below, generate interview questions.

Job Role:
{job_role or "General Software Engineer"}

Resume:
{resume_text}

Return ONLY valid JSON.

{{
    "technical_questions": [],
    "hr_questions": [],
    "project_questions": [],
    "coding_questions": []
}}

Requirements:
- 5 technical questions
- 5 HR questions
- 5 project questions
- 5 coding questions
"""

    response = client.models.generate_content(
        model=MODEL,
        contents=prompt
    )

    text = response.text.strip()
    text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)