from app.services.llm import ask_gemini
from app.services.permissions import (
    check_permission
)

def run(data):
    if not check_permission(
        "strategy",
        "strategy_generation"
    ):
        return "Permission denied."

    prompt = f"""
    You are a Strategy Agent.

    Based on this business research:

    {data}

    Create:

    1. Go-To-Market Strategy
    2. Pricing Strategy
    3. Branding Strategy
    4. Instagram Growth Plan
    5. Customer Acquisition Plan
    6. Viral Growth Ideas
    7. Low Budget Marketing Strategy

    Focus on startup-friendly execution.

    Format response in markdown.
    """

    return ask_gemini(prompt)