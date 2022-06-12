from fastapi import APIRouter, HTTPException, status
from backend.core.models import database
from datetime import date
import logging

router = APIRouter()

logger = logging.getLogger()


@router.get("/results/{destination_id}")
def serve_destination(
    destination_id: str,
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
    print(destination_id)  # Need this
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

    if (hotels := database.generate_hotels(destination_id)) == -1:
        # TODO: Check if HTTP 400 is the appropriate exception to raise
        #       in the event of invalid destination_id
        raise HTTPException(status.HTTP_400_BAD_REQUEST)
    elif len(hotels) == 0:
        # Destination exists but no hotels found
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)
    return [{i[0].name, i[0].hotel_id, i[0].avg_price} for i in hotels]
