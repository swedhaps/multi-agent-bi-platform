from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from prometheus_fastapi_instrumentator import Instrumentator

from opentelemetry.instrumentation.fastapi import (
    FastAPIInstrumentor
)
from app.services.rate_limiter import limiter
from app.api.routes import router

# from app.services.tracing import tracer

# from slowapi import Limiter
# from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi import _rate_limit_exceeded_handler

app = FastAPI(
    title="Multi Agent BI Platform"
)

# limiter = Limiter(
#     key_func=get_remote_address
# )

app.state.limiter = limiter

app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SlowAPIMiddleware
)

app.include_router(router)

Instrumentator().instrument(app).expose(app)

FastAPIInstrumentor.instrument_app(app)