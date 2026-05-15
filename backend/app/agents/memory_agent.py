from app.services.llm import ask_gemini

def run(data):

    prompt = f"""
    You are a Memory Agent.

    Summarize and store the important information from:

    {data}

    Extract:

    1. Business Goals
    2. Target Audience
    3. Important Strategies
    4. Constraints
    5. Key Decisions

    Return short memory notes.

    Format response in markdown.
    """

    return ask_gemini(prompt)