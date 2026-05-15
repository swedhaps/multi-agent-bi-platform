AGENT_PERMISSIONS = {

    "research": [
        "research_only"
    ],

    "strategy": [
        "strategy_generation"
    ],

    "critic": [
        "critique_only"
    ],

    "planner": [
        "planning_only"
    ],

    "qa": [
        "validation_only"
    ]
}

def check_permission(
    agent_name,
    permission
):

    allowed = AGENT_PERMISSIONS.get(
        agent_name,
        []
    )

    return permission in allowed