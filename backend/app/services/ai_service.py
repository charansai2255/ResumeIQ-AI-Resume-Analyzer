import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def analyze_resume(parsed_text: str):

    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze the resume below.

Return ONLY valid JSON.

JSON format:

{{
  "ats_score": 0,
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "suggestions": [],
  "suitable_roles": [],
  "interview_questions": []
}}

Resume:

{parsed_text}
"""
    MODEL = os.getenv("GEMINI_MODEL")

    response = client.models.generate_content(
    model=MODEL,
    contents=prompt
 )

    text = response.text.strip()

    # Remove Markdown code fences if present
    text = text.replace("```json", "").replace("```", "").strip()

    return json.loads(text)