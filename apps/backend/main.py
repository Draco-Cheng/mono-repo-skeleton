from fastapi import FastAPI, APIRouter

app = FastAPI()

@app.get("/")
@app.head("/")
def health_check():
    """
    Health check endpoint for monitoring and CI/CD.
    Supports both GET and HEAD methods for wait-on compatibility.
    """
    return {"status": "ok", "service": "backend"}

api_router = APIRouter(prefix="")
@api_router.get("/ping")
def ping():
    """
    Simple health check endpoint for frontend-backend integration.
    """
    return {"result": "pong"}

# Include the API router
app.include_router(api_router)