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

    hotel_attr = [
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
    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(
            f"/results/A6Dz?checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    for hotel in response.json()["hotels"]:
        assert set(hotel.keys()) == set(hotel_attr)
        assert len(hotel["uid"]) == 4 and hotel["uid"].isalnum()
        assert isinstance(hotel["price"], (float, int)) and hotel["price"] >= 0
        assert isinstance(hotel["points"], (float, int)) and hotel["points"] >= 0
        # https://stackoverflow.com/questions/11849636/maximum-lat-and-long-bounds-for-the-world-google-maps-api-latlngbounds
        assert (
            isinstance(hotel["latitude"], (float, int))
            and -85.05115 <= hotel["latitude"] <= 85
        )
        assert (
            isinstance(hotel["longitude"], (float, int))
            and -180 <= hotel["latitude"] <= 180
        )
        assert isinstance(hotel["distance"], (float, int)) and hotel["distance"] >= 0
        assert isinstance(hotel["name"], str) and hotel["name"] != ""
        assert isinstance(hotel["address"], str) and hotel["address"] != ""
        assert isinstance(hotel["rating"], (float, int)) and hotel["rating"] >= 0
        assert isinstance(hotel["review"], (float, int)) and hotel["review"] >= 0
        assert isinstance(hotel["photo"], str)  # Validation of photo done in app
