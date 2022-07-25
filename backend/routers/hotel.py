import datetime
import logging

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from backend.core.models import database

router = APIRouter()

logger = logging.getLogger()


class Booking(BaseModel):
    """
    Data passed by the frontend corresponding to a hotel room booking
    """

    salutation: str | None = None
    firstName: str | None = None
    lastName: str | None = None
    email: str | None = None
    phone: str | None = None
    additionalData: str | None = None
    cardName: str | None = None
    cardNumber: str | None = None
    billingAddress: str | None = None
    roomName: str | None = None
    hotelName: str | None = None
    roomPrice: float | None = None
    checkInDate: datetime.date | None = None
    checkOutDate: datetime.date | None = None
    numAdults: int | None = None
    numChildren: int | None = None
    numRooms: int | None = None
    room_uid: str | None = None
    hotel_uid: str | None = None
    dest_uid: str | None = None


@router.get("/results/hotel/{hotel_uid}", tags=["hotel"])
def serve_hotel(
    hotel_uid: str | None = None,
    dest_uid: str | None = None,
    checkInDate: str | None = None,
    checkOutDate: str | None = None,
    numRooms: int | None = None,
    guests: int | None = None,
    currency: str | None = None,
):
    """
    Given a hotel_uid and other query parameters, return the
    list of rooms corresponding to that hotel, along with their pricing information
    """
    return database.generate_hotel(
        hotel_uid, dest_uid, checkInDate, checkOutDate, numRooms, guests, currency
    )


@router.post("/booking", tags=["booking"])
def create_booking(booking: Booking):
    """
    Given a Booking-type request body, create a new booking and return the UID.
    If invalid parameters are passed, return -1 as the UID.
    """
    return {"booking_uid": database.create_booking(booking)}


@router.get("/summary/{booking_uid}", tags=["booking"])
def get_booking(booking_uid: str):
    """
    Given a booking_uid, return the corresponding booking data.
    If an invalid booking_uid is passed, return -1.
    """
    return database.get_booking(booking_uid)
