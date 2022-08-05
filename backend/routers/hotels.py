import logging
from datetime import date

from fastapi import APIRouter, HTTPException, status

from backend.core.models import database

router = APIRouter()

logger = logging.getLogger()


@router.get("/results/{dest_uid}", tags=["hotels"])
def serve_destination(
    dest_uid: str | None = None,
    checkInDate: str | None = None,
    checkOutDate: str | None = None,
    numRooms: int | None = None,
    guests: int | None = None,
    currency: str | None = None,
):
    """
    Given a destination_id and other query parameters, return the
    list of hotels corresponding to that destination, along with their pricing information
    """
    return database.generate_hotels(
        dest_uid, checkInDate, checkOutDate, numRooms, guests, currency
    )
