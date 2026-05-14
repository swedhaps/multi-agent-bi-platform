import time

from app.agents import (
    research,
    strategy,
    critic,
    planner,
    qa
)

from app.services.memory import save_memory
from app.services.tracing import tracer
from app.services.logger import log_event

from app.services.metrics import (
    WORKFLOW_COUNT,
    AGENT_EXECUTION_COUNT,
    REQUEST_LATENCY,
    ERROR_COUNT
)

MAX_STEPS = 10

def run_workflow(data):

    logs = []

    start = time.time()
    

    try:
        with tracer.start_as_current_span("workflow_execution"):
            WORKFLOW_COUNT.inc()

            for step in range(MAX_STEPS):

                logs.append(f"Workflow Step {step}")

                AGENT_EXECUTION_COUNT.labels(
                    agent_name="research"
                ).inc()

                research_output = research.run(data)
                log_event("Research Agent Executed")

                logs.append("Research Agent Completed")

                AGENT_EXECUTION_COUNT.labels(
                    agent_name="strategy"
                ).inc()

                strategy_output = strategy.run(
                    research_output
                )
                log_event("Strategy Agent Executed")
                logs.append("Strategy Agent Completed")

                AGENT_EXECUTION_COUNT.labels(
                    agent_name="critic"
                ).inc()

                critic_output = critic.run(
                    strategy_output
                )
                log_event("Critic Agent Executed")

                logs.append("Critic Agent Completed")

                AGENT_EXECUTION_COUNT.labels(
                    agent_name="planner"
                ).inc()

                planner_output = planner.run(
                    critic_output
                )
                log_event("Planner Agent Executed")

                logs.append("Planner Agent Completed")

                AGENT_EXECUTION_COUNT.labels(
                    agent_name="qa"
                ).inc()

                qa_output = qa.run(
                    planner_output
                )
                log_event("QA Agent Executed")
                logs.append("QA Agent Completed")

                save_memory(qa_output)

                latency = time.time() - start

                REQUEST_LATENCY.observe(latency)

                return {
                    "research": research_output,
                    "strategy": strategy_output,
                    "critic": critic_output,
                    "planner": planner_output,
                    "qa": qa_output,
                    "latency": latency,
                    "logs": logs
                }

    except Exception as e:
        log_event(f"Workflow Error: {str(e)}")

        ERROR_COUNT.inc()

        return {
            "error": str(e)
        }

    return {
        "error": "Loop protection triggered"
    }