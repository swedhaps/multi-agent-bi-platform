import time
from datetime import datetime

from app.agents import (
    research,
    strategy,
    critic,
    planner,
    qa
)

from app.services.memory import (
    save_memory,
    retrieve_memory
)

from app.services.tracing import tracer

from app.services.logger import log_event

from app.services.history import save_history

from app.services.metrics import (
    WORKFLOW_COUNT,
    AGENT_EXECUTION_COUNT,
    REQUEST_LATENCY,
    ERROR_COUNT
)

def run_workflow(data):

    memory_context = retrieve_memory(
        str(data)[:200]
    )

    log_event(
        f"Retrieved Memory: {memory_context}"
    )

    start = time.time()

    try:

        with tracer.start_as_current_span(
            "workflow_execution"
        ):

            WORKFLOW_COUNT.inc()

            # ─────────────────────────────
            # Research Agent
            # ─────────────────────────────

            log_event(">>> Research Agent Started")

            AGENT_EXECUTION_COUNT.labels(
                agent_name="research"
            ).inc()

            with tracer.start_as_current_span(
                "research_agent"
            ):

                research_output = research.run(
                    f"""
                    Current Request:
                    {data}

                    Previous Similar Memory:
                    {memory_context}
                    """
                )

            log_event(
                "Research Agent Completed"
            )

            # ─────────────────────────────
            # Strategy Agent
            # ─────────────────────────────

            log_event(">>> Strategy Agent Started")

            AGENT_EXECUTION_COUNT.labels(
                agent_name="strategy"
            ).inc()

            with tracer.start_as_current_span(
                "strategy_agent"
            ):

                strategy_output = strategy.run(
                    research_output
                )

            log_event(
                "Strategy Agent Executed"
            )

            # ─────────────────────────────
            # Critic Agent
            # ─────────────────────────────

            log_event(">>> Critic Agent Started")

            AGENT_EXECUTION_COUNT.labels(
                agent_name="critic"
            ).inc()

            with tracer.start_as_current_span(
                "critic_agent"
            ):

                critic_output = critic.run(
                    strategy_output
                )

            log_event(
                "Critic Agent Executed"
            )

            # ─────────────────────────────
            # Planner Agent
            # ─────────────────────────────

            log_event(">>> Planner Agent Started")

            AGENT_EXECUTION_COUNT.labels(
                agent_name="planner"
            ).inc()

            with tracer.start_as_current_span(
                "planner_agent"
            ):

                planner_output = planner.run(
                    f"""
                    Strategy:
                    {strategy_output}

                    Critic Notes:
                    {critic_output}
                    """
                )

            log_event(
                "Planner Agent Executed"
            )

            # ─────────────────────────────
            # QA Agent
            # ─────────────────────────────

            log_event(">>> QA Agent Started")

            AGENT_EXECUTION_COUNT.labels(
                agent_name="qa"
            ).inc()

            with tracer.start_as_current_span(
                "qa_agent"
            ):

                qa_output = qa.run(
                    planner_output
                )

            log_event(
                "QA Agent Executed"
            )

            # ─────────────────────────────
            # Memory Save
            # ─────────────────────────────

            save_memory(
                qa_output[:500]
            )

            latency = time.time() - start

            REQUEST_LATENCY.observe(
                latency
            )

            log_event(
                f"Workflow Completed in {latency:.1f}s"
            )

            save_history({

                "timestamp":
                    datetime.now().isoformat(),

                "status": "success",

                "latency": latency,

                "research":
                    research_output[:300],

                "strategy":
                    strategy_output[:300],

                "critic":
                    critic_output[:300],

                "planner":
                    planner_output[:300],

                "qa":
                    qa_output[:300]
            })

            return {

                "research":
                    research_output,

                "strategy":
                    strategy_output,

                "critic":
                    critic_output,

                "planner":
                    planner_output,

                "qa":
                    qa_output,

                "latency":
                    latency,
            }

    except Exception as e:

        log_event(
            f"Workflow Error: {str(e)}"
        )

        ERROR_COUNT.inc()

        return {
            "error": str(e)
        }