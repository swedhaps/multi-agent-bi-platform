
# Autonomous Multi-Agent Business Intelligence Platform

Simple implementation using:
- CrewAI
- Gemini 1.5 Flash
- FastAPI
- React
- ChromaDB
- Celery + Redis
- Grafana + Prometheus

## Features
- 7 agents
- Memory + vector retrieval
- Async background jobs
- Retry handling
- Workflow visualization
- Prompt logging
- Token tracking
- Rate limiting
- Infinite loop protection
- Cost protection
- Streaming frontend

## Setup

### Backend
```bash
cd backend
poetry install
poetry shell
cp .env.example .env
```

Add your Gemini API key:
```env
GOOGLE_API_KEY=your_key
```

Run:
```bash
docker compose up --build
```

Backend:
- API: http://localhost:8000
- Grafana: http://localhost:3000
- Prometheus: http://localhost:9090

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend:
http://localhost:5173

## Demo Flow
1. Open frontend
2. Fill company details
3. Submit
4. Watch agents execute
5. View logs and workflow
6. Check Grafana dashboard

## Video Recording Script
1. Introduce project architecture
2. Show 7 agents
3. Show frontend inputs
4. Run strategy generation
5. Show live logs
6. Show memory retrieval
7. Show retry recovery
8. Show Grafana monitoring
9. Show generated report
