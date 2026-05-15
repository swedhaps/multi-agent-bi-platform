# Multi-Agent BI Platform

## Autonomous Multi-Agent Business Intelligence & Execution Platform

A production-inspired AI orchestration platform that uses multiple specialized AI agents to collaboratively generate business strategies, execution plans, critiques, and QA validations.

The platform demonstrates enterprise-style AI orchestration with observability, monitoring, distributed tracing, async execution, and reliability engineering.

---

# Features

## Multi-Agent Workflow
- Research Agent
- Strategy Agent
- Critic Agent
- Planner Agent
- QA Agent
- Final AI Business Report Generation

## AI Workflow Orchestration
- Sequential DAG-inspired execution
- Context-aware agent collaboration
- Final report aggregation

## Observability & Monitoring
- Prometheus metrics
- Grafana dashboards
- OpenTelemetry tracing
- Jaeger distributed tracing
- Live logs

## Reliability Features
- Retry handling
- Failure recovery
- Rate limiting
- Permission boundaries
- Token monitoring
- Cost protection

## Async Processing
- Background job execution
- Workflow history
- Job status tracking

---

# Tech Stack

## Frontend
- React.js
- Material UI
- Axios
- React Markdown

## Backend
- FastAPI
- Python
- Gemini API
- Redis
- Celery

## Observability
- Prometheus
- Grafana
- OpenTelemetry
- Jaeger

## Infrastructure
- Docker
- Docker Compose

---

# System Architecture

```text
User Input
    ↓
Workflow Orchestrator
    ↓
Research Agent
    ↓
Strategy Agent
    ↓
Critic Agent
    ↓
Planner Agent
    ↓
QA Agent
    ↓
Final AI Business Report
```

---

# Observability Pipeline

```text
FastAPI Metrics
    ↓
Prometheus
    ↓
Grafana Dashboard
```

```text
OpenTelemetry Tracing
    ↓
Jaeger
    ↓
Distributed Trace Visualization
```

---

# Project Setup

# 1. Clone Repository

```bash
git clone <YOUR_GITHUB_URL>
cd multi-agent-bi-platform
```

---

# 2. Backend Setup

Navigate to backend folder:

```bash
cd backend
```

---

## Install Poetry

```bash
pip install poetry
```

---

## Install Dependencies

```bash
poetry install
```

---

## Activate Virtual Environment

```bash
poetry shell
```

---

# 3. Configure Environment Variables

Create a `.env` file inside backend directory:

```env
GOOGLE_API_KEY=your_gemini_api_key
```

---

# 4. Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

---

# 5. Frontend Setup

Open new terminal.

Navigate to frontend folder:

```bash
cd frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# 6. Docker Setup (Recommended)

From project root:

```bash
docker compose up --build
```

This starts:

- FastAPI Backend
- Redis
- Prometheus
- Grafana
- Jaeger

---

# Service URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3000 |
| Jaeger | http://localhost:16686 |

---

# Grafana Setup

## Login

```text
Username: admin
Password: admin
```

---

## Add Prometheus Data Source

URL:

```text
http://prometheus:9090
```

---

# Jaeger Setup

Open:

```text
http://localhost:16686
```

Select service:

```text
multi-agent-bi-platform
```

Then click:

```text
Find Traces
```

---

# Available Metrics

The platform exposes Prometheus metrics including:

- workflow_executions_total
- workflow_errors_total
- request_latency_seconds
- estimated_token_usage_total
- agent_executions_total
- process_cpu_seconds_total
- process_resident_memory_bytes

---

# Distributed Tracing

Each workflow generates spans for:

- workflow_execution
- research_agent
- strategy_agent
- critic_agent
- planner_agent
- qa_agent

This enables:
- execution visibility
- latency analysis
- bottleneck detection
- workflow debugging

---

# Sample Workflow

Input:
- Company Description
- Product Details
- Target Audience
- Goals
- Constraints

Output:
- Market Research
- GTM Strategy
- Criticism & Risk Analysis
- Execution Roadmap
- QA Validation
- Final AI Business Report

---


# Demo Highlights

- Multi-agent orchestration
- Real-time observability
- Distributed tracing
- Enterprise-style monitoring
- AI workflow execution
- Live metrics dashboard

---

# Author

Swedha P S
---

