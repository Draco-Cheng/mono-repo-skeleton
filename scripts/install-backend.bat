@echo off

if not exist .venv (
    python -m venv .venv
)

call .venv\Scripts\activate
uv pip install -e apps/backend