from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

class TestPingEndpoint:
    def test_ping_returns_pong(self):
        """Test that /ping returns the expected response."""
        response = client.get("/ping")
        assert response.status_code == 200
        assert response.json() == {"result": "pong"}
    
    def test_ping_response_structure(self):
        """Test that /ping response has the correct structure."""
        response = client.get("/ping")
        data = response.json()
        assert "result" in data
        assert isinstance(data["result"], str)
        assert data["result"] == "pong"
