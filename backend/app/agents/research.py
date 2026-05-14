from app.services.llm import ask_gemini

def run(data):

    prompt = f"""
    You are a Research Agent for an AI business platform.

    Analyze this startup/business idea:

    {data}

    Generate:

    1. Market Overview
    2. Target Audience Insights
    3. Competitor Analysis
    4. Industry Trends
    5. Key Opportunities
    6. Risks & Challenges

    Return concise and practical insights.

    Format response in markdown.
    """

    return ask_gemini(prompt)