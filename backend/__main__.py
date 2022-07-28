from datetime import datetime

import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.models import database
from .logger import logger as lg
from .routers import auth, destinations, hotel, hotels
from .shared_resources import resources

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

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost",
    "https://localhost",
    "https://localhost:3000",
]

resources["REQUESTS_SESSION"] = requests.Session()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(destinations.router)
app.include_router(hotels.router)
app.include_router(hotel.router)
app.include_router(auth.router)
