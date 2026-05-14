from fastapi import APIRouter
from pydantic import BaseModel

from app.workflow import run_workflow
from app.services.security import validate_prompt

router = APIRouter()

class RequestData(BaseModel):
    company_description: str
    product_details: str
    target_audience: str
    goals: str
    constraints: str

@router.post("/run")
def run_agents(data: RequestData):

    if not validate_prompt(
        data.company_description
    ):
        return {
            "error": "unsafe prompt"
        }

    result = run_workflow(
        data.dict()
    )

    return result

@router.get("/logs")
def get_logs():

    try:

        with open(
            "logs/workflow.log",
            "r"
        ) as file:

            lines = file.readlines()

        return {
            "logs": lines[-50:]
        }

    except Exception as e:

        return {
            "error": str(e)
        }