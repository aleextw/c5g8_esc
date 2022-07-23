from fastapi.testclient import TestClient

from ..__main__ import app
from ..core.models.database import *

client = TestClient(app)


def test_get_destinations():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == generate_destinations()
