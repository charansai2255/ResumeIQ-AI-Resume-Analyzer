from app.services.ai_service import client

def generate_cover_letter(
    resume_text: str,
    company_name: str,
    job_title: str,
    job_description: str
):

    prompt = f"""
You are an expert technical recruiter.

Generate a professional cover letter.

Resume:

{resume_text}

Company:

{company_name}

Job Title:

{job_title}

Job Description:

{job_description}

Return ONLY the cover letter text.
"""

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt
    )

    return response.text.strip()