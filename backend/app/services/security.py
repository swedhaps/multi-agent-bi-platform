
BAD_WORDS = ["ignore instructions", "system prompt"]

def validate_prompt(text):
    lowered = text.lower()

    for word in BAD_WORDS:
        if word in lowered:
            return False

    return True
