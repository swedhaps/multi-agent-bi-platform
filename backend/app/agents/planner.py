
from app.services.llm import ask_gemini

def run(data):
    prompt = f"Planner Agent: {{data}}"
    return ask_gemini(prompt)
