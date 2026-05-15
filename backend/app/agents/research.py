from app.services.llm import ask_gemini

from app.services.permissions import (
    check_permission
)

def run(data):

    if not check_permission(
        "research",
        "research_only"
    ):
        return "Permission denied."

    prompt = f"""
    You are a senior market research analyst.

    Analyze:
    {data}

    Provide:
    - Market trends
    - Competitor insights
    - Audience insights

    Keep response under 300 words.
    """

    return ask_gemini(prompt)