from fastapi import FastAPI, APIRouter
from config import API_PREFIX

app = FastAPI()

# Health check endpoint for wait-on and monitoring (not under API_PREFIX)
@app.get("/")
@app.head("/")
def health_check():
    """
    Health check endpoint for monitoring and CI/CD.
    Supports both GET and HEAD methods for wait-on compatibility.
    """
    return {"status": "ok", "service": "backend"}

# API Router for all API endpoints
api_router = APIRouter(prefix=API_PREFIX)

@api_router.get("/ping")
def ping():
    """
    Simple health check endpoint for frontend-backend integration.
    """
    return {"result": "pong"}

# Include the API router
app.include_router(api_router)