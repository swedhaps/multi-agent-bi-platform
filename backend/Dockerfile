
FROM python:3.11

WORKDIR /app

RUN pip install poetry

COPY . .

RUN poetry config virtualenvs.create false
RUN poetry install --no-root

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
