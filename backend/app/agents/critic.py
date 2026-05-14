from app.services.llm import ask_gemini

def run(data):

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