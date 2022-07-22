import datetime
import logging

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from backend.core.models import database

router = APIRouter()

logger = logging.getLogger()


class Booking(BaseModel):
    name: str
    phone: str
    email: str
    additionalData: str | None = None
    roomName: str
    hotelName: str
    roomPrice: float
    checkInDate: datetime.date
    checkOutDate: datetime.date
    numAdults: int
    numChildren: int
    numRooms: int
    hotel_uid: str
    dest_uid: str


@router.get("/results/hotel/{hotel_uid}")
def serve_hotels(
    hotel_uid: str,
    dest_uid: str,
    checkInDate: str,
    checkOutDate: str,
    numRooms: int,
    guests: int,
    currency: str,
):
    """
    Given a destination_id and other optional query parameters, return the
    list of hotels corresponding to that destination, along with their pricing information
    """

    if (
        hotel := database.generate_hotel(
            hotel_uid, dest_uid, checkInDate, checkOutDate, numRooms, guests, currency
        )
    ) == -1:
        # TODO: Check if HTTP 400 is the appropriate exception to raise
        #       in the event of invalid hotel_id
        raise HTTPException(status.HTTP_400_BAD_REQUEST)
    return hotel


@router.post("/booking")
def create_booking(booking: Booking):
    if (booking_uid := database.create_booking(booking)) != -1:
        return {"booking_uid": booking_uid}
    else:
        raise HTTPException(status.HTTP_400_BAD_REQUEST)


@router.get("/summary/{booking_uid}")
def get_booking(booking_uid: str):
    if (booking := database.get_booking(booking_uid)) != -1:
        return booking
    else:
        raise HTTPException(status.HTTP_400_BAD_REQUEST)
