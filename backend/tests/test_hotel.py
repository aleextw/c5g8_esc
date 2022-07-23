import datetime
import time

from fastapi.testclient import TestClient

from ..__main__ import app
from ..core.models.database import *

client = TestClient(app)

room_attr = [
    "uid",
    "name",
    "price",
    "photo",
    "description",
    "long_description",
    "amenities",
    "free_cancellation",
    "additional_info",
]

hotel_attr = [
    "uid",
    "latitude",
    "longitude",
    "name",
    "address",
    "rating",
    "review",
    "images",
    "description",
    "amenities",
]

NoneType = type(None)


def test_get_rooms_valid_hotel():
    """
    Should return properly formatted list of hotel rooms given valid hotel UID
    """
    hotel_uid = "KVj4"
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
            f"/results/hotel/{hotel_uid}?dest_uid={dest_uid}&checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    data = response.json()
    assert set(data["hotel_details"].keys()) == set(hotel_attr)
    assert (
        isinstance(data["hotel_details"]["uid"], str)
        and len(data["hotel_details"]["uid"]) == 4
        and data["hotel_details"]["uid"].isalnum()
    )
    # https://stackoverflow.com/questions/11849636/maximum-lat-and-long-bounds-for-the-world-google-maps-api-latlngbounds
    assert (
        isinstance(data["hotel_details"]["latitude"], (float, int))
        and -85.05115 <= data["hotel_details"]["latitude"] <= 85
    )
    assert (
        isinstance(data["hotel_details"]["longitude"], (float, int))
        and -180 <= data["hotel_details"]["longitude"] <= 180
    )
    assert (
        isinstance(data["hotel_details"]["name"], str)
        and data["hotel_details"]["name"] != ""
    )
    assert (
        isinstance(data["hotel_details"]["address"], str)
        and data["hotel_details"]["address"] != ""
    )
    assert (
        isinstance(data["hotel_details"]["rating"], (float, int))
        and data["hotel_details"]["rating"] >= 0
    )
    assert (
        isinstance(data["hotel_details"]["review"], (float, int))
        and data["hotel_details"]["review"] >= 0
    )
    assert set(data["hotel_details"]["images"].keys()) == set(
        ["suffix", "count", "prefix"]
    )
    assert isinstance(data["hotel_details"]["images"]["count"], int)
    assert isinstance(data["hotel_details"]["images"]["suffix"], str)
    assert isinstance(data["hotel_details"]["images"]["prefix"], str)
    assert isinstance(data["hotel_details"]["description"], str)
    assert (
        # TODO: Check what a non-empty amenities dict should contain (wrt datatypes)
        isinstance(data["hotel_details"]["amenities"], dict)
    )

    for room in data["rooms"]:
        assert set(room.keys()) == set(room_attr)
        assert isinstance(room["uid"], str) and len(room["uid"]) > 0
        assert isinstance(room["name"], str) and len(room["name"]) >= 0
        assert isinstance(room["price"], (float, int)) and room["price"] >= 0
        assert isinstance(room["photo"], list)
        for item in room["photo"]:
            assert isinstance(item, dict)
            assert set(item.keys()) == set(["url", "high_resolution_url", "hero_image"])
            assert isinstance(item["url"], str) and len(item["url"]) > 0
            assert (
                isinstance(item["high_resolution_url"], str)
                and len(item["high_resolution_url"]) > 0
            )
            assert isinstance(item["hero_image"], bool)
        assert isinstance(room["description"], str)
        assert isinstance(room["long_description"], (str, NoneType))
        assert isinstance(room["amenities"], list)
        for item in room["amenities"]:
            assert isinstance(item, str)
        assert isinstance(room["free_cancellation"], bool)
        assert isinstance(room["additional_info"], dict)


def test_get_rooms_invalid_hotel():
    """
    Should return empty list of hotel rooms given invalid hotel UID
    """
    hotel_uid = "asdf"
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
            f"/results/hotel/{hotel_uid}?dest_uid={dest_uid}&checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    assert response.json()["rooms"] == [] and response.json()["hotel_details"] == {}


def test_get_rooms_invalid_dates():
    """
    Should return empty list of hotel rooms given invalid dates
    """
    hotel_uid = "KVj4"
    dest_uid = "A6Dz"
    check_in_date = datetime.date.today() + datetime.timedelta(days=-2)
    check_out_date = datetime.date.today() + datetime.timedelta(days=-3)
    num_rooms = 1
    num_adults = 2
    num_children = 0
    currency = "SGD"

    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(
            f"/results/hotel/{hotel_uid}?dest_uid={dest_uid}&checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    assert response.json()["rooms"] == [] and response.json()["hotel_details"] == {}


def test_get_rooms_invalid_num_rooms():
    """
    Should return empty list of hotel rooms given invalid number of rooms
    """
    hotel_uid = "KVj4"
    dest_uid = "A6Dz"
    check_in_date = datetime.date.today() + datetime.timedelta(days=2)
    check_out_date = datetime.date.today() + datetime.timedelta(days=3)
    num_rooms = 0
    num_adults = 2
    num_children = 0
    currency = "SGD"

    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(
            f"/results/hotel/{hotel_uid}?dest_uid={dest_uid}&checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    assert response.json()["rooms"] == [] and response.json()["hotel_details"] == {}


def test_get_rooms_invalid_num_guests():
    """
    Should return empty list of hotel rooms given invalid number of rooms
    """
    hotel_uid = "KVj4"
    dest_uid = "A6Dz"
    check_in_date = datetime.date.today() + datetime.timedelta(days=2)
    check_out_date = datetime.date.today() + datetime.timedelta(days=3)
    num_rooms = 1
    num_adults = 0
    num_children = 0
    currency = "SGD"

    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(
            f"/results/hotel/{hotel_uid}?dest_uid={dest_uid}&checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    assert response.json()["rooms"] == [] and response.json()["hotel_details"] == {}


def test_get_rooms_invalid_currency():
    """
    Should return empty list of hotel rooms given invalid number of rooms
    """
    hotel_uid = "KVj4"
    dest_uid = "A6Dz"
    check_in_date = datetime.date.today() + datetime.timedelta(days=2)
    check_out_date = datetime.date.today() + datetime.timedelta(days=3)
    num_rooms = 1
    num_adults = 2
    num_children = 0
    currency = "FOO"

    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(
            f"/results/hotel/{hotel_uid}?dest_uid={dest_uid}&checkInDate={check_in_date}&checkOutDate={check_out_date}&numRooms={num_rooms}&guests={num_adults + num_children}&currency={currency}"
        )
        assert response.status_code == 200
        time.sleep(5)

    assert response.json()["rooms"] == [] and response.json()["hotel_details"] == {}


def test_get_rooms_missing_parameters():
    """
    Should return empty list of hotel rooms given missing parameters
    """
    hotel_uid = "KVj4"
    dest_uid = "A6Dz"

    response = None
    # Wait for completed response before checking hotel data
    while response is None or not response.json()["completed"]:
        response = client.get(f"/results/hotel/{hotel_uid}?dest_uid={dest_uid}")
        assert response.status_code == 200
        time.sleep(5)

    assert response.json()["rooms"] == [] and response.json()["hotel_details"] == {}
