from fastapi import APIRouter, HTTPException, status
from backend.core.models import database
from datetime import date
import logging

router = APIRouter()

logger = logging.getLogger()


@router.get("/hotels/details/{hotel_id}")
def serve_hotels(
    hotel_id: str,
    dest_uid: str,
    checkInDate: str,
    checkOutDate: str,
    guests: int,
    currency: str,
):
    """
    Given a destination_id and other optional query parameters, return the
    list of hotels corresponding to that destination, along with their pricing information
    """
    print(hotel_id)  # Need this
    print(dest_uid)
    print(checkInDate)  # Need this
    print(checkOutDate)  # Need this
    print(guests)  # Need this
    print(currency)  # Need this?

    if (
        hotel := database.generate_hotel(
            hotel_id, dest_uid, checkInDate, checkOutDate, guests, currency
        )
    ) == -1:
        # TODO: Check if HTTP 400 is the appropriate exception to raise
        #       in the event of invalid hotel_id
        raise HTTPException(status.HTTP_400_BAD_REQUEST)
    return hotel
