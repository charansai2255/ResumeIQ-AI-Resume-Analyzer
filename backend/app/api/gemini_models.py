import os

from fastapi import APIRouter, HTTPException
from google import genai
from google.genai import errors

router = APIRouter(
    prefix="/gemini",
    tags=["Gemini"]
)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY is not configured")

client = genai.Client(api_key=api_key)


@router.get("/models")
def list_gemini_models():
    """
    List models visible to this API key that support generateContent.

    This does NOT guarantee that the project currently has free quota
    for every returned model.
    """

    try:
        models = []

        for model in client.models.list():
            actions = model.supported_actions or []

            if "generateContent" not in actions:
                continue

            models.append({
                "name": model.name,
                "display_name": model.display_name,
                "supported_actions": actions,
            })

        return {
            "count": len(models),
            "models": models,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to list Gemini models: {str(e)}"
        )
        
@router.get("/models/test")
def test_gemini_models():
    """
    DEVELOPMENT ONLY.

    Sends a minimal generateContent request to each Gemini model
    available to the API key.
    """

    results = []

    try:
        models = list(client.models.list())

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unable to list models: {str(e)}"
        )

    for model in models:

        actions = model.supported_actions or []

        if "generateContent" not in actions:
            continue

        model_name = model.name

        # SDK generate_content normally expects the model ID.
        if model_name.startswith("models/"):
            model_name = model_name.removeprefix("models/")

        try:

            response = client.models.generate_content(
                model=model_name,
                contents="Reply only with OK."
            )

            results.append({
                "model": model_name,
                "status": "WORKING",
                "response": response.text,
            })

        except errors.ClientError as e:

            if e.code == 429:
                status = "QUOTA_EXCEEDED"

            elif e.code == 404:
                status = "NOT_FOUND"

            elif e.code == 403:
                status = "NO_PERMISSION"

            elif e.code == 400:
                status = "UNAVAILABLE_OR_BILLING_REQUIRED"

            else:
                status = f"CLIENT_ERROR_{e.code}"

            results.append({
                "model": model_name,
                "status": status,
                "error": str(e),
            })

        except Exception as e:

            results.append({
                "model": model_name,
                "status": "ERROR",
                "error": str(e),
            })

    working = [
        item["model"]
        for item in results
        if item["status"] == "WORKING"
    ]

    return {
        "working_count": len(working),
        "working_models": working,
        "results": results,
    }