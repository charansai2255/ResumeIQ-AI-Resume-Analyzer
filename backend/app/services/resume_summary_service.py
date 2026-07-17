from app.services.ai_service import client


def generate_resume_summary(resume_text: str):

    prompt = f"""
You are an expert resume writer.

Read the resume below and generate a professional summary.

Requirements:
- 80–120 words
- Professional tone
- Highlight technical skills, experience, and strengths
- Do not invent information
- Return ONLY the summary text

Resume:

{resume_text}
"""

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt
    )

    return response.text.strip()