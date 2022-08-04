import datetime
import time

from fastapi.testclient import TestClient

from ..__main__ import app
from ..core.models.database import *

client = TestClient(app)

NoneType = type(None)

global booking_uid
booking_uid = ""

def test_make_booking_valid_data():
    """
    Should return a valid booking_uid given valid booking data
    """
    booking_data = {
        "salutation": "Mr",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "90000001",
        "additionalData": "",
        "cardName": "John Doe",
        "cardNumber": "4242424242424242",
        "billingAddress": "123 Fake Street",
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
        isinstance(response.json().get("booking_uid", None), str) and response.json().get("booking_uid", None) != "-1"
    )
    global booking_uid
    booking_uid = response.json().get("booking_uid")
    print(booking_uid)
    print()


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
    global booking_uid

    booking_attr = [
        "booking_info",
        "display_info",
        "account_info",
        "payment_info",
        "destination_info"
    ]

    booking_info_attr = [
        "id",
        "room_uid",
        "hotel_uid",
        "price",
        "currency",
        "guest_booking_ref",
        "hotel_destination",
        "assigned_user",
    ]

    display_info_attr = [
        "id",
        "room_name",
        "hotel_name",
        "check_in_date",
        "check_out_date",
        "num_adults",
        "num_children",
        "num_rooms",
        "booking_ref",
    ]

    account_info_attr = [
        "id",
        "salutation",
        "first_name",
        "last_name",
        "email",
        "contact_number",
        "additional_data",
        "booking_ref",
    ]

    payment_info_attr = [
        "id",
        "card_name",
        "card_number",
        "billing_address",
        "booking_ref",
    ]

    destination_info_attr = [
        "id",
        "term",
        "state",
        "destination_type",
        "destination_id",
        "latitude",
        "longitude",
    ]

    response = client.get(f"/summary/{booking_uid}")
    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(booking_attr)
    assert set(data["booking_info"]) == set(booking_info_attr)
    assert set(data["display_info"]) == set(display_info_attr)
    assert set(data["account_info"]) == set(account_info_attr)
    assert set(data["payment_info"]) == set(payment_info_attr)
    assert set(data["destination_info"]) == set(destination_info_attr)
