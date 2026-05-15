from app.services.llm import ask_gemini
from app.services.permissions import (
    check_permission
)

from app.services.logger import log_event

def run(data):

    allowed = check_permission(
        "qa",
        "qa_only"
    )

    if not allowed:
        log_event(
            "QA permission warning bypassed"
        )

    prompt = f"""
    You are a QA Agent.

    Review this final business execution plan:

    {data}

    Validate:

    1. Feasibility
    2. Clarity
    3. Consistency
    4. Budget Friendliness
    5. Execution Readiness
    6. Overall Quality

    Give final approval summary.

    Format response in markdown.
    """

    return ask_gemini(prompt)