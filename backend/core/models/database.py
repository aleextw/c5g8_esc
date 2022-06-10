import json
import logging

from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker

from backend.config import config
from backend.core.models.base import Base
from backend.core.schemas.schemas import *
from backend.shared_resources import resources

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
                    if (
                        session.execute(
                            select(Destination).where(
                                (Destination.term == i.get("term", None))
                                | (Destination.destination_id == i.get("uid", None))
                            )
                        ).first()
                        is None
                    ):
                        destination = Destination(
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


def generate_destinations():
    """
    Returns a list of {term: destination_uid} pairs.
    """
    destinations = resources["SESSION"].execute(select(Destination)).all()
    return [{i[0].term: i[0].destination_id} for i in destinations]


def generate_hotels(destination_id):
    destination = (
        resources["SESSION"]
        .execute(
            select(Destination).where(Destination.destination_id == destination_id)
        )
        .first()
    )

    if destination is None:
        return -1
    else:
        return destination[0].hotels
