from datetime import datetime

import uvicorn
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .config import config
from .core.models import database
from .logger import logger as lg
from .routers import destinations, hotel, hotels
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

origins = ["http://localhost:3000", "localhost:3000", "http://localhost"]


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

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
