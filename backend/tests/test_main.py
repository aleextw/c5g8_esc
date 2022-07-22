import datetime
import time

from fastapi.testclient import TestClient

from ..__main__ import app
from ..core.models.database import *

client = TestClient(app)


def test_get_destinations():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == generate_destinations()


def test_get_hotels_valid_destination():
    check_in_date = datetime.date.today() + datetime.timedelta(days=2)
    check_out_date = datetime.date.today() + datetime.timedelta(days=3)
    num_rooms = 1
    num_adults = 2
    num_children = 0
    currency = "SGD"

    response = None
    while response is None or not response.json()["completed"]:
        response = client.get(
            f"/hotels?destination=Rome,%20Italy&dest_uid=A6Dz&checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&numAdults={num_adults}&numChildren={num_children}&currency={currency}"
        )
        assert response.status_code == 200
        for hotel in response.json()["hotels"]:
            assert set(hotel.keys()) == set(
                [
                    "uid",
                    "searchRank",
                    "price",
                    "points",
                    "latitude",
                    "longitude",
                    "distance",
                    "name",
                    "address",
                    "rating",
                    "review",
                    "photo",
                ]
            )
        time.sleep(2)
