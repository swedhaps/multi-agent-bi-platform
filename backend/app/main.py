from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from prometheus_fastapi_instrumentator import Instrumentator

from opentelemetry.instrumentation.fastapi import (
    FastAPIInstrumentor
)

from app.api.routes import router

from app.services.tracing import tracer

app = FastAPI(
    title="Multi Agent BI Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

Instrumentator().instrument(app).expose(app)

FastAPIInstrumentor.instrument_app(app)