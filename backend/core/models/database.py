import json
import logging

from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker

from backend.shared_resources import resources

from ..config import config
from ..schemas import schemas
from .base import Base

logger = logging.getLogger()


def load():
    """
    Create tables using models.py and return a session object.
    Returns None on error.
    """
    database_uri = config.get("DATABASE_URI", None)
    if database_uri is not None:
        engine = create_engine(
            database_uri, echo=False, connect_args={"check_same_thread": False}
        )

        Base.metadata.create_all(engine, checkfirst=True)
        session = sessionmaker(bind=engine)

        return session()

    logger.error("Database URI not set up in config.")

    return None


def reset():
    """
    Checks if tables exist and delete if true.
    """
    database_uri = config.get("DATABASE_URI", None)
    if database_uri is not None:
        engine = create_engine(
            database_uri, echo=False, connect_args={"check_same_thread": False}
        )
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(engine, checkfirst=True)
        session = sessionmaker(bind=engine)

        return session()

    logger.error("Database URI not set up in config.")

    return None


def setup():
    """
    Call load() and inserts data from template files specified by config.
    Returns None on error.
    """
    if (session := reset()) is None:
        return None

    setup_files = {
        "DESTINATION_SETUP_FILE": config.get("DESTINATION_SETUP_FILE", None),
    }

    if not any(map(lambda x: x is None, setup_files.values())):
        setup_data = {
            file_name: json.loads(open(file_data, encoding="utf8").read())
            for file_name, file_data in setup_files.items()
        }

        try:
            for i in setup_data["DESTINATION_SETUP_FILE"]:
                if i.get("uid", None) is not None and i.get("type", None) == "city":
                    destination = schemas.Destination(
                        term=i.get("term", None),
                        state=i.get("state", None),
                        destination_type=i.get("type", None),
                        destination_id=i.get("uid", None),
                        latitude=i.get("latitude", None),
                        longitude=i.get("longitude", None),
                    )
                    session.add(destination)

            session.commit()
            return session
        except Exception as ex:
            session.rollback()
            session.close()
            logger.error("Failed to insert data during setup. Traceback: %s", ex)
            return None

    msg = "The following files do not have a location set up in config:"
    for file_name, file_data in setup_files.items():
        if file_data is None:
            msg += f"- {file_name}"
    logger.error(msg)

    return None
