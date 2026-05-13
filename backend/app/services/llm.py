
import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-3.1-flash-lite")

def ask_gemini(prompt: str):
    response = model.generate_content(prompt)
    return response.text
