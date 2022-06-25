import logging
from datetime import date

from fastapi import APIRouter, HTTPException, status

from backend.core.models import database

router = APIRouter()

logger = logging.getLogger()


@router.get("/results/{destination_id}")
def serve_destination(
    destination_id: str,
    checkInDate: str,
    checkOutDate: str,
    guests: int,
    currency: str,
):
    """
    Given a destination_id and other optional query parameters, return the
    list of hotels corresponding to that destination, along with their pricing information
    """
    if (
        hotels := database.generate_hotels(
            destination_id, checkInDate, checkOutDate, guests, currency
        )
    ) == -1:
        # TODO: Check if HTTP 400 is the appropriate exception to raise
        #       in the event of invalid destination_id
        raise HTTPException(status.HTTP_400_BAD_REQUEST)
    return hotels
