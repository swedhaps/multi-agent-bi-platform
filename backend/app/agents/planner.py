from app.services.llm import ask_gemini
from app.services.permissions import (
    check_permission
)

from app.services.logger import log_event

def run(data):

    allowed = check_permission(
        "planner",
        "planner_only"
    )

    if not allowed:
        log_event(
            "Planner permission warning bypassed"
        )

    prompt = f"""
    You are a Planner Agent.

    Based on this business strategy:

    {data}

    Create:

    1. 30-Day Launch Plan
    2. Weekly Execution Roadmap
    3. Content Calendar
    4. KPI Tracking Plan
    5. Marketing Tasks
    6. Priority Checklist

    Keep execution realistic for a small startup team.

    Format response in markdown.
    """

    return ask_gemini(prompt)