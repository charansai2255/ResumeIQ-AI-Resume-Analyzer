import json

from app.services.ai_service import client


def analyze_job_match(resume_text: str, job_description: str):

    prompt = f"""
You are an expert ATS and technical recruiter.

Compare the following resume with the given Job Description.

Return ONLY valid JSON.

JSON format:

{{
    "match_score": 0,
    "matching_skills": [],
    "missing_skills": [],
    "strengths": [],
    "weaknesses": [],
    "suggestions": []
}}

Resume:

{resume_text}

----------------------------------

Job Description:

{job_description}
"""

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt
    )

    text = response.text.strip()

    text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)