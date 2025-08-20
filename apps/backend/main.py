from fastapi import FastAPI

app = FastAPI()

# All backend API routes are now under /api/*
@app.get("/api/ping")
def ping():
    """
    Simple health check endpoint for frontend-backend integration.
    """
    return {"result": "pong"}