
import time
from app.agents import research, strategy, critic, planner, qa
from app.services.memory import save_memory

MAX_STEPS = 10

def run_workflow(data):
    logs = []

    start = time.time()

    for step in range(MAX_STEPS):
        logs.append(f"Step {step}")

        research_output = research.run(data)
        strategy_output = strategy.run(research_output)
        critic_output = critic.run(strategy_output)
        planner_output = planner.run(critic_output)
        qa_output = qa.run(planner_output)

        save_memory(qa_output)

        latency = time.time() - start

        return {
            "research": research_output,
            "strategy": strategy_output,
            "critic": critic_output,
            "planner": planner_output,
            "qa": qa_output,
            "latency": latency,
            "logs": logs
        }

    return {"error": "loop protection triggered"}
