@echo off

call .venv\Scripts\activate
uvicorn apps.backend.main:app --reload