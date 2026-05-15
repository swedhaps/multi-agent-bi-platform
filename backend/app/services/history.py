import json
import os

HISTORY_FILE = "logs/workflow_history.json"

def save_history(data):

    history = []

    if os.path.exists(HISTORY_FILE):

        try:
            with open(HISTORY_FILE, "r") as f:
                history = json.load(f)

        except:
            history = []

    history.insert(0, data)

    with open(HISTORY_FILE, "w") as f:
        json.dump(history[:20], f, indent=2)

def get_history():

    if not os.path.exists(HISTORY_FILE):
        return []

    try:
        with open(HISTORY_FILE, "r") as f:
            return json.load(f)

    except:
        return []