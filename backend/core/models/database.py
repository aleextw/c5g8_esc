import json
import logging
from typing import Set

import requests
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker

from backend.config import config
from backend.core.models.base import Base
from backend.core.schemas.schemas import *
from backend.shared_resources import resources
import random

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
    return [{"term": i[0].term, "uid": i[0].destination_id} for i in destinations]


def generate_hotels(destination_id, checkin, checkout, num_rooms, guests, currency):
    if any(
        [
            i is None
            for i in [destination_id, checkin, checkout, num_rooms, guests, currency]
        ]
    ):
        return {"completed": True, "hotels": []}
    hotels = resources["REQUESTS_SESSION"].get(get_dest_endpoint(destination_id))
    hotels_pricing = resources["REQUESTS_SESSION"].get(
        get_dest_price_endpoint(
            destination_id,
            checkin,
            checkout,
            num_rooms,
            guests,
            currency,
        )
    )

    print(
        get_dest_price_endpoint(
            destination_id,
            checkin,
            checkout,
            num_rooms,
            guests,
            currency,
        )
    )
    if (
        hotels_pricing.status_code == requests.codes.ok
        and hotels.status_code == requests.codes.ok
    ):
        return_data = {"completed": hotels_pricing.json()["completed"], "hotels": {}}
        try:
            # Set up pricing data
            for hotel_pricing_data in hotels_pricing.json()["hotels"]:
                return_data["hotels"][hotel_pricing_data["id"]] = {
                    "uid": hotel_pricing_data["id"],
                    "searchRank": hotel_pricing_data["searchRank"],
                    "price": hotel_pricing_data["lowest_converted_price"]
                    if hotels_pricing.json()["completed"]
                    else hotel_pricing_data["converted_price"],
                    "points": hotel_pricing_data["points"],
                }

            # Add static data to hotels w pricing data
            for hotel_static_data in hotels.json():
                if return_data["hotels"].get(hotel_static_data["id"], None) is not None:
                    return_data["hotels"][hotel_static_data["id"]].update(
                        {
                            "latitude": hotel_static_data["latitude"],
                            "longitude": hotel_static_data["longitude"],
                            "distance": hotel_static_data["distance"],
                            "name": hotel_static_data["name"],
                            "address": hotel_static_data["address"],
                            "rating": hotel_static_data["rating"],
                            "review": hotel_static_data["trustyou"]["score"][
                                "kaligo_overall"
                            ],
                            "photo": hotel_static_data["image_details"]["prefix"]
                            + str(hotel_static_data["default_image_index"])
                            + hotel_static_data["image_details"]["suffix"],
                        }
                    )
        except Exception as e:
            # Data missing
            pass

        # Remove entries with missing data
        for hotel_data in set(return_data["hotels"].keys()):
            if len(list(return_data["hotels"][hotel_data].keys())) != 12:
                del return_data["hotels"][hotel_data]

        return_data["hotels"] = list(return_data["hotels"].values())
        return return_data
    return {"completed": True, "hotels": []}


#  TODO: CHECK
def generate_hotel(
    hotel_id, destination_id, checkin, checkout, num_rooms, guests, currency
):
    if any(
        [
            i is None
            for i in [
                hotel_id,
                destination_id,
                checkin,
                checkout,
                num_rooms,
                guests,
                currency,
            ]
        ]
    ):
        return {"completed": True, "rooms": [], "hotel_details": {}}

    hotel = resources["REQUESTS_SESSION"].get(get_hotel_endpoint(hotel_id))
    rooms_pricing = resources["REQUESTS_SESSION"].get(
        get_hotel_details_endpoint(
            destination_id,
            hotel_id,
            checkin,
            checkout,
            num_rooms,
            guests,
            currency,
        )
    )
    if (
        rooms_pricing.status_code == requests.codes.ok
        and hotel.status_code == requests.codes.ok
    ):
        return_data = {
            "completed": rooms_pricing.json()["completed"],
            "hotel_details": {},
            "rooms": {},
        }

        if len(rooms_pricing.json()["rooms"]) == 0:
            return {"completed": True, "rooms": [], "hotel_details": {}}

        # Set up pricing data
        for room_pricing_data in rooms_pricing.json()["rooms"]:
            return_data["rooms"][room_pricing_data["key"]] = {
                "uid": room_pricing_data["key"],
                "name": room_pricing_data["roomNormalizedDescription"],
                "price": room_pricing_data["lowest_converted_price"],
                "photo": room_pricing_data["images"],
                "description": room_pricing_data["description"],
                "long_description": room_pricing_data.get("long_description", None),
                "amenities": room_pricing_data["amenities"],
                "free_cancellation": room_pricing_data["free_cancellation"],
                "additional_info": room_pricing_data["roomAdditionalInfo"],
            }

        # Add static data to hotel
        hotel = hotel.json()

        if hotel == {}:
            return {"completed": True, "rooms": [], "hotel_details": {}}

        return_data["hotel_details"].update(
            {
                "uid": hotel["id"],
                "latitude": hotel["latitude"],
                "longitude": hotel["longitude"],
                "name": hotel["name"],
                "address": hotel["address"],
                "rating": hotel["rating"],
                "review": hotel["trustyou"]["score"]["kaligo_overall"],
                "images": hotel["image_details"],
                "description": hotel["description"],
                "amenities": hotel["amenities"],
            }
        )

        # Remove entries with no static data
        for hotel_data in set(return_data["rooms"].keys()):
            if return_data["rooms"][hotel_data].get("name", None) is None:
                del return_data["rooms"][hotel_data]

        return_data["rooms"] = list(return_data["rooms"].values())
        return return_data
    return {
        "completed": True,
        "hotel_details": {},
        "rooms": [],
    }


# dest static
get_dest_endpoint = (
    lambda x: f"https://hotelapi.loyalty.dev/api/hotels?destination_id={x}"
)

# dest pricing
def get_dest_price_endpoint(
    destination_id, checkin, checkout, num_rooms, guests, currency
):
    return f"https://hotelapi.loyalty.dev/api/hotels/prices?destination_id={destination_id}&checkin={checkin}&checkout={checkout}&lang=en_US&currency={currency}&country_code=SG&guests={'|'.join([str(guests)] * num_rooms)}&partner_id=1"


# room static
get_hotel_endpoint = lambda x: f"https://hotelapi.loyalty.dev/api/hotels/{x}"

# room pricing
def get_hotel_details_endpoint(
    destination_id, hotel_id, checkin, checkout, num_rooms, guests, currency
):
    return f"https://hotelapi.loyalty.dev/api/hotels/{hotel_id}/price?destination_id={destination_id}&checkin={checkin}&checkout={checkout}&lang=en_US&currency={currency}&country_code=SG&guests={'|'.join([str(guests)] * num_rooms)}&partner_id=1"


def create_booking(booking):
    if any(
        [
            i is None
            for i in [
                booking.name,
                booking.phone,
                booking.email,
                booking.roomName,
                booking.hotelName,
                booking.roomPrice,
                booking.checkInDate,
                booking.checkOutDate,
                booking.numAdults,
                booking.numChildren,
                booking.numRooms,
                booking.room_uid,
                booking.hotel_uid,
                booking.dest_uid,
            ]
        ]
    ):
        return "-1"
    id = "".join(
        [random.choice("abcdefghijklmnopqrstuvwxyz1234567890") for _ in range(64)]
    )
    while (
        resources["SESSION"].execute(select(Booking).where(Booking.id == id)).first()
        is not None
    ):
        id = "".join(
            [random.choice("abcdefghijklmnopqrstuvwxyz1234567890") for _ in range(64)]
        )

    booking_entry = Booking(
        booking_display_info="",
        booking_price=booking.roomPrice,
        supplier_booking_ID=0,
        supplier_booking_ref=0,
        guest_booking_ref=id,
        guest_account_info="",
        guest_payment_info="",
        destination_id=booking.dest_uid,
    )

    resources["SESSION"].add(booking_entry)
    resources["SESSION"].commit()

    return id


def get_booking(booking_uid):
    if (
        booking := resources["SESSION"]
        .execute(select(Booking).where(Booking.guest_booking_ref == booking_uid))
        .all()
    ):
        return booking
    else:
        return -1
