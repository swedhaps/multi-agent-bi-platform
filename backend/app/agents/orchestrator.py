from app.services.llm import ask_gemini

def run(data):

    prompt = f"""
    You are an Orchestrator Agent.

    Coordinate the following workflow:

    {data}

    Ensure:
    - smooth agent collaboration
    - logical flow
    - no duplicated work
    - optimized execution

    Return orchestration summary.

    Format response in markdown.
    """

    return ask_gemini(prompt)