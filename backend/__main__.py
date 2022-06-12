from datetime import datetime

from .config import config
from .core.models import database
from fastapi import FastAPI, HTTPException, Depends
from .logger import logger as lg
from .shared_resources import resources

from .routers import destinations, hotels, hotel


logger = lg.start_logger()
if logger is None:
    logger.error("Logger setup failed")
    exit()

resources["SESSION"] = database.load()
if resources["SESSION"] is None:
    logger.error("Database setup failed")
    exit()

resources["SETUP_TIME"] = datetime.now()
# # For testing purposes
# database.generate_destinations()

app = FastAPI()

app.include_router(destinations.router)
app.include_router(hotels.router)
