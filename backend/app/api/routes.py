from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel
import threading, uuid
from app.services.history import get_history

from app.workflow import run_workflow
from app.services.security import validate_prompt
from fastapi import Request
# from app.main import limiter
from app.services.rate_limiter import limiter

router = APIRouter()

# In-memory job store (replace with Redis for production)
jobs: dict = {}

class RequestData(BaseModel):
    company_description: str
    product_details: str
    target_audience: str
    goals: str
    constraints: str

def _run_job(job_id: str, payload: dict):
    jobs[job_id]["status"] = "running"
    result = run_workflow(payload)
    jobs[job_id]["result"] = result
    jobs[job_id]["status"] = "done" if "error" not in result else "error"

@router.post("/run")
@limiter.limit("5/minute")
def run_agents(request: Request, data: RequestData):
    if not validate_prompt(data.company_description):
        return {"error": "unsafe prompt"}

    job_id = str(uuid.uuid4())
    jobs[job_id] = {"status": "pending", "result": None}

    thread = threading.Thread(
        target=_run_job,
        args=(job_id, data.dict()),
        daemon=True
    )
    thread.start()

    return {"job_id": job_id}

@router.get("/status/{job_id}")
def get_status(job_id: str):
    job = jobs.get(job_id)
    if not job:
        return {"error": "job not found"}
    return job   # {"status": "running"|"done"|"error", "result": ...}

@router.get("/logs")
def get_logs():
    try:
        with open("logs/workflow.log", "r") as f:
            lines = f.readlines()
        return {"logs": [l.strip() for l in lines[-100:]]}
    except Exception as e:
        return {"error": str(e)}
    
@router.get("/history")
def workflow_history():

    return {
        "history": get_history()
    }