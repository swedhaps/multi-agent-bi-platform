from app.services.llm import ask_gemini

def run(data):

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