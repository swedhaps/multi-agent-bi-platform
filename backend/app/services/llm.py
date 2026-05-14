
# import google.generativeai as genai
# import os

# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# model = genai.GenerativeModel("gemini-3.1-flash-lite")

# def ask_gemini(prompt: str):
#     response = model.generate_content(prompt)
#     return response.text

import google.generativeai as genai
import os

from app.services.metrics import TOKEN_USAGE

genai.configure(
    api_key=os.getenv("GOOGLE_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-3.1-flash-lite"
)

def estimate_tokens(text: str):
    return max(1, len(text) // 4)

def ask_gemini(prompt: str):

    input_tokens = estimate_tokens(prompt)

    response = model.generate_content(prompt)

    output = response.text

    output_tokens = estimate_tokens(output)

    TOKEN_USAGE.inc(input_tokens + output_tokens)

    return output