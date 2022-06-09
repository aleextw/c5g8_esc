from datetime import datetime

from config import config
from core.models import database
from fastapi import FastAPI
from logger import logger as lg
from shared_resources import resources


def main():
    logger = lg.start_logger()
    if logger is None:
        logger.error("Logger setup failed")
        return

    resources["SESSION"] = database.load()
    if resources["SESSION"] is None:
        logger.error("Database setup failed")
        return

    resources["SETUP_TIME"] = datetime.now()

    database.generate_destinations()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        resources["SESSION"].close()
        exit()
