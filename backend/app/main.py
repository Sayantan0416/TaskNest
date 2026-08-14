from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from . import models
from .routes.auth import router as auth_router
from .routes.tasks import router as task_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TaskNest API",
    description="Backend API for TaskNest Task Scheduling Tool",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(task_router)


@app.get("/")
def root():
    return {
        "message": "TaskNest API is running!",
        "status": "success",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "TaskNest API",
    }