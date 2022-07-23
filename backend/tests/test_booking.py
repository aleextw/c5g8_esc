import datetime
import time

from fastapi.testclient import TestClient

from ..__main__ import app
from ..core.models.database import *

client = TestClient(app)


def test_make_booking_valid_data():
    """
    Should return a valid booking_uid given valid booking data
    """
    booking_data = {
        "name": "John Doe",
        "phone": "90000001",
        "email": "john@example.com",
        "additionalData": None,
        "roomName": "Example Room",
        "hotelName": "Example Hotel",
        "roomPrice": "172.16",
        "checkInDate": str(datetime.date.today() + datetime.timedelta(days=2)),
        "checkOutDate": str(datetime.date.today() + datetime.timedelta(days=3)),
        "numAdults": 2,
        "numChildren": 1,
        "numRooms": 1,
        "room_uid": "er-F5EC4C9DEEC9727C1DE883042997FB10-554F444073748F00AB727095F8D75E0A",
        "hotel_uid": "KVj4",
        "dest_uid": "A6Dz",
    }
    response = client.post(
        "/booking",
        json=booking_data,
    )
    assert response.status_code == 200
    assert (
        isinstance(response.json().get("booking_uid", None), str) and response != "-1"
    )


def test_make_booking_missing_data():
    """
    Should return -1 given invalid booking data
    """
    booking_data = {
        "name": "John Doe",
        "phone": "90000001",
        "email": "john@example.com",
        "additionalData": None,
        "roomName": "Example Room",
        "hotelName": "Example Hotel",
        "roomPrice": "172.16",
        "checkInDate": str(datetime.date.today() + datetime.timedelta(days=2)),
        "checkOutDate": str(datetime.date.today() + datetime.timedelta(days=3)),
        "numAdults": 2,
        "numChildren": 1,
        "numRooms": 1,
    }
    response = client.post(
        "/booking",
        json=booking_data,
    )
    assert response.status_code == 200
    assert (
        isinstance(response.json().get("booking_uid", None), str)
        and response.json()["booking_uid"] == "-1"
    )


def test_get_booking_data_valid_uid():
    booking_uid = "u4g9y6hzh7rygyl09dzwffzbg2174ryw15smfsboscjbhtdwcmt8cbvnc01x8qxi"

    booking_attr = [
        "name",
        "phone",
        "email",
        "additionalData",
        "roomName",
        "hotelName",
        "roomPrice",
        "checkInDate",
        "checkOutDate",
        "numAdults",
        "numChildren",
        "numRooms",
        "room_uid",
        "hotel_uid",
        "dest_uid",
    ]

    response = client.get(f"/summary/{booking_uid}")
    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(booking_attr)
