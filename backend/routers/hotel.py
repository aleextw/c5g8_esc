from fastapi import APIRouter, HTTPException, status
from backend.core.models import database
from datetime import date
import logging

router = APIRouter()

logger = logging.getLogger()


@router.get("/hotels/details/{hotel_id}")
def serve_hotels(
    hotel_id: str,
    destination: str,
    destination_type: str,
    lat: float,
    lng: float,
    checkInDate: str,
    checkOutDate: str,
    guests: int,
    country: str,
    landingPage: str | None,
    currency: str,
    partnerId: str,
):
    """
    Given a destination_id and other optional query parameters, return the
    list of hotels corresponding to that destination, along with their pricing information
    """
    print(hotel_id)  # Need this
    print(destination)
    print(destination_type)
    print(lat)
    print(lng)
    print(checkInDate)  # Need this
    print(checkOutDate)  # Need this
    print(guests)  # Need this
    print(country)
    print(landingPage)
    print(currency)  # Need this?
    print(partnerId)

    if (hotel := database.generate_hotel(hotel_id)) == -1:
        # TODO: Check if HTTP 400 is the appropriate exception to raise
        #       in the event of invalid hotel_id
        raise HTTPException(status.HTTP_400_BAD_REQUEST)
    return hotel
