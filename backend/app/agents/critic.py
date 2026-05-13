
from app.services.llm import ask_gemini

def run(data):
    prompt = f"Critic Agent: {{data}}"
    return ask_gemini(prompt)
