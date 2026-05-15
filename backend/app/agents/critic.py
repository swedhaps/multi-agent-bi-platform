from app.services.llm import ask_gemini
from app.services.permissions import (
    check_permission
)

from app.services.logger import log_event

def run(data):
    allowed = check_permission(
        "critic",
        "critic_only"
    )
    if not allowed:
        log_event(
            "Critic permission warning bypassed"
        )
    prompt = f"""
    You are a Critic Agent.

    Review this business strategy:

    {data}

    Analyze:

    1. Weaknesses
    2. Missing Opportunities
    3. Risk Factors
    4. Unrealistic Assumptions
    5. Budget Concerns
    6. Better Alternatives

    Return constructive criticism only.

    Format response in markdown.
    """

    return ask_gemini(prompt)