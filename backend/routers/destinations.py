import logging
from datetime import date

from fastapi import APIRouter, HTTPException, status

from backend.core.models import database

router = APIRouter()

logger = logging.getLogger()


@router.get("/", tags=["destinations"])
def serve_destinations():
    """
    Returns a list of {term: destination_uid} to the caller.
    Raises HTTP 500 error if no destinations are found (uh oh)
    """
    if len(destinations := database.generate_destinations()) > 0:
        return destinations
    else:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR)
