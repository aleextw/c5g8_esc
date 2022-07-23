import datetime
import time

from fastapi.testclient import TestClient

from ..__main__ import app
from ..core.models.database import *

client = TestClient(app)

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


def test_get_hotels_valid_destination():
    """
    Should return properly formatted list of hotels given valid destination UID
    """
    dest_uid = "A6Dz"
    check_in_date = datetime.date.today() + datetime.timedelta(days=2)
    check_out_date = datetime.date.today() + datetime.timedelta(days=3)
    num_rooms = 1
    num_adults = 2
    num_children = 0
    currency = "SGD"

    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(
            f"/results/{dest_uid}?checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    for hotel in response.json()["hotels"]:
        assert set(hotel.keys()) == set(hotel_attr)
        assert (
            isinstance(hotel["uid"], str)
            and len(hotel["uid"]) == 4
            and hotel["uid"].isalnum()
        )
        assert isinstance(hotel["price"], (float, int)) and hotel["price"] >= 0
        assert isinstance(hotel["points"], (float, int)) and hotel["points"] >= 0
        # https://stackoverflow.com/questions/11849636/maximum-lat-and-long-bounds-for-the-world-google-maps-api-latlngbounds
        assert (
            isinstance(hotel["latitude"], (float, int))
            and -85.05115 <= hotel["latitude"] <= 85
        )
        assert (
            isinstance(hotel["longitude"], (float, int))
            and -180 <= hotel["longitude"] <= 180
        )
        assert isinstance(hotel["distance"], (float, int)) and hotel["distance"] >= 0
        assert isinstance(hotel["name"], str) and hotel["name"] != ""
        assert isinstance(hotel["address"], str) and hotel["address"] != ""
        assert isinstance(hotel["rating"], (float, int)) and hotel["rating"] >= 0
        assert isinstance(hotel["review"], (float, int)) and hotel["review"] >= 0
        assert isinstance(hotel["photo"], str)  # Validation of photo done in app


def test_get_hotels_invalid_destination():
    """
    Should return empty list of hotels given invalid destination UID
    """
    dest_uid = "asdf"
    check_in_date = datetime.date.today() + datetime.timedelta(days=2)
    check_out_date = datetime.date.today() + datetime.timedelta(days=3)
    num_rooms = 1
    num_adults = 2
    num_children = 0
    currency = "SGD"

    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(
            f"/results/{dest_uid}?checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    assert response.json()["hotels"] == []


def test_get_hotels_invalid_dates():
    """
    Should return empty list of hotels given invalid dates
    """
    dest_uid = "A6Dz"
    check_in_date = datetime.date.today() + datetime.timedelta(days=-1)
    check_out_date = datetime.date.today() + datetime.timedelta(days=-2)
    num_rooms = 1
    num_adults = 2
    num_children = 0
    currency = "SGD"

    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(
            f"/results/{dest_uid}?checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    assert response.json()["hotels"] == []


def test_get_hotels_invalid_num_rooms():
    """
    Should return empty list of hotels given invalid number of rooms
    """
    dest_uid = "A6Dz"
    check_in_date = datetime.date.today() + datetime.timedelta(days=1)
    check_out_date = datetime.date.today() + datetime.timedelta(days=2)
    num_rooms = 0
    num_adults = 2
    num_children = 0
    currency = "SGD"

    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(
            f"/results/{dest_uid}?checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    assert response.json()["hotels"] == []


def test_get_hotels_invalid_num_guests():
    """
    Should return empty list of hotels given invalid number of guests
    """
    dest_uid = "A6Dz"
    check_in_date = datetime.date.today() + datetime.timedelta(days=1)
    check_out_date = datetime.date.today() + datetime.timedelta(days=2)
    num_rooms = 1
    num_adults = 0
    num_children = 0
    currency = "SGD"

    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(
            f"/results/{dest_uid}?checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    assert response.json()["hotels"] == []


def test_get_hotels_invalid_currency():
    """
    Should return empty list of hotels given invalid currency
    """
    dest_uid = "A6Dz"
    check_in_date = datetime.date.today() + datetime.timedelta(days=1)
    check_out_date = datetime.date.today() + datetime.timedelta(days=2)
    num_rooms = 1
    num_adults = 0
    num_children = 0
    currency = "FOO"

    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(
            f"/results/{dest_uid}?checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    assert response.json()["hotels"] == []


def test_get_hotels_missing_parameters():
    """
    Should return empty list of hotels given missing parameters
    """
    dest_uid = "A6Dz"

    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(f"/results/{dest_uid}")
        assert response.status_code == 200
        time.sleep(5)

    assert response.json()["hotels"] == []
