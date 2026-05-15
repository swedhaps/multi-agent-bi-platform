# import google.generativeai as genai
# import os

# from app.services.metrics import TOKEN_USAGE
# from app.services.logger import log_event

# genai.configure(
#     api_key=os.getenv("GOOGLE_API_KEY")
# )

# model = genai.GenerativeModel(
#     "gemini-3.1-flash-lite"
# )

# def estimate_tokens(text: str):
#     return max(1, len(text) // 4)

# def ask_gemini(prompt: str):

#     log_event(f"PROMPT: {prompt}")

#     input_tokens = estimate_tokens(prompt)

#     response = model.generate_content(prompt)

#     output = response.text

#     log_event(f"RESPONSE: {output}")

#     output_tokens = estimate_tokens(output)

#     TOKEN_USAGE.inc(
#         input_tokens + output_tokens
#     )

#     return output

import google.generativeai as genai
import os
import time

from app.services.metrics import TOKEN_USAGE
from app.services.logger import log_event

genai.configure(
    api_key=os.getenv("GOOGLE_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-3.1-flash-lite"
)

MAX_RETRIES = 3
MAX_INPUT_TOKENS = 4000

def estimate_tokens(text: str):
    return max(1, len(text) // 4)

def ask_gemini(prompt: str):

    log_event(f"PROMPT: {prompt}")

    input_tokens = estimate_tokens(prompt)
    if input_tokens > MAX_INPUT_TOKENS:

        log_event(
            "Prompt Blocked: Token Limit Exceeded"
        )

        return (
            "Request rejected: prompt too large."
        )

    for attempt in range(MAX_RETRIES):

        try:

            log_event(
                f"Gemini Attempt {attempt + 1}"
            )

            response = model.generate_content(
                prompt
            )

            output = response.text

            log_event(
                f"RESPONSE: {output}"
            )

            output_tokens = estimate_tokens(
                output
            )

            TOKEN_USAGE.inc(
                input_tokens + output_tokens
            )

            return output

        except Exception as e:

            log_event(
                f"Gemini Retry {attempt + 1} Failed: {str(e)}"
            )

            time.sleep(2)

    log_event(
        "Gemini Failed After All Retries"
    )

    return (
        "AI generation failed after retries."
    )