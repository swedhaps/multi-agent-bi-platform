import time
from app.agents import research, strategy, critic, planner, qa
from app.services.memory import save_memory
from app.services.tracing import tracer
from app.services.logger import log_event
from app.services.metrics import (
    WORKFLOW_COUNT, AGENT_EXECUTION_COUNT,
    REQUEST_LATENCY, ERROR_COUNT
)

def run_workflow(data):
    start = time.time()

    try:
        with tracer.start_as_current_span("workflow_execution"):
            WORKFLOW_COUNT.inc()

            # ── Research ──────────────────────────────────────────
            log_event(">>> Research Agent Started")
            AGENT_EXECUTION_COUNT.labels(agent_name="research").inc()
            research_output = research.run(data)
            log_event("Research Agent Completed")          # UI watches for this

            # ── Strategy ──────────────────────────────────────────
            log_event(">>> Strategy Agent Started")
            AGENT_EXECUTION_COUNT.labels(agent_name="strategy").inc()
            strategy_output = strategy.run(research_output)
            log_event("Strategy Agent Executed")

            # ── Critic → feeds back into strategy if weak ─────────
            log_event(">>> Critic Agent Started")
            AGENT_EXECUTION_COUNT.labels(agent_name="critic").inc()
            critic_output = critic.run(strategy_output)
            log_event("Critic Agent Executed")

            # ── Planner ───────────────────────────────────────────
            log_event(">>> Planner Agent Started")
            AGENT_EXECUTION_COUNT.labels(agent_name="planner").inc()
            # Planner gets BOTH strategy + critic notes
            planner_output = planner.run(
                f"Strategy:\n{strategy_output}\n\nCritic Notes:\n{critic_output}"
            )
            log_event("Planner Agent Executed")

            # ── QA ────────────────────────────────────────────────
            log_event(">>> QA Agent Started")
            AGENT_EXECUTION_COUNT.labels(agent_name="qa").inc()
            qa_output = qa.run(planner_output)
            log_event("QA Agent Executed")

            save_memory(qa_output)

            latency = time.time() - start
            REQUEST_LATENCY.observe(latency)
            log_event(f"Workflow Completed in {latency:.1f}s")

            return {
                "research": research_output,
                "strategy": strategy_output,
                "critic":   critic_output,
                "planner":  planner_output,
                "qa":       qa_output,
                "latency":  latency,
            }

    except Exception as e:
        log_event(f"Workflow Error: {str(e)}")
        ERROR_COUNT.inc()
        return {"error": str(e)}