from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI from Nx!"}

@app.get("/ping")
def ping():
    return {"result": "pong"}