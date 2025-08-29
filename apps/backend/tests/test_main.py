import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

class TestPingEndpoint:
    def test_ping_returns_pong(self):
        """Test that /api/ping returns the expected response."""
        response = client.get("/api/ping")
        assert response.status_code == 200
        assert response.json() == {"result": "pong"}
    
    def test_ping_response_structure(self):
        """Test that /api/ping response has the correct structure."""
        response = client.get("/api/ping")
        data = response.json()
        assert "result" in data
        assert isinstance(data["result"], str)
        assert data["result"] == "pong"
