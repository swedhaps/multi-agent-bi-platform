from prometheus_client import Counter, Histogram

REQUEST_COUNT = Counter(
    "http_requests_total",
    "Total HTTP Requests"
)

WORKFLOW_COUNT = Counter(
    "workflow_executions_total",
    "Total Workflow Executions"
)

AGENT_EXECUTION_COUNT = Counter(
    "agent_executions_total",
    "Total Agent Executions",
    ["agent_name"]
)

ERROR_COUNT = Counter(
    "workflow_errors_total",
    "Total Workflow Errors"
)

REQUEST_LATENCY = Histogram(
    "request_latency_seconds",
    "Request Latency"
)

TOKEN_USAGE = Counter(
    "estimated_token_usage_total",
    "Estimated Token Usage"
)