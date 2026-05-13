
from celery import Celery
from app.workflow import run_workflow

celery = Celery(
    "tasks",
    broker="redis://redis:6379/0",
    backend="redis://redis:6379/0"
)

@celery.task(bind=True, max_retries=3)
def process_strategy(self, payload):
    try:
        return run_workflow(payload)
    except Exception as e:
        raise self.retry(exc=e, countdown=5)
