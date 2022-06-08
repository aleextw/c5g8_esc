from sqlalchemy import Column, Enum, ForeignKey, Integer, Numeric, Text, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

import enum

from ..models.base import Base


class Destination(Base):
    __tablename__ = "destination"

    id = Column(Integer, primary_key=True)
    term = Column(Text)
    state = Column(Text)
    destination_type = Column(Text)
    # Are all UIDs fixed-length / can we change to String(4)?
    destination_id = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)
    hotels = relationship("Hotel", backref="destination")
    booking_id = Column(Integer, ForeignKey("booking.id"))

    def __repr__(self):
        return (
            f"Destination(id={self.id}, name={self.name}, booking_id={self.booking_id})"
        )


class Hotel(Base):
    __tablename__ = "hotel"

    id = Column(Integer, primary_key=True)
    name = Column(Text)
    hotel_id = Column(Text)
    latitude = Column(Numeric(8, 6))
    longitude = Column(Numeric(8, 6))
    avg_price = Column(Integer)
    description = Column(Text)
    address = Column(Text)
    rating = Column(Float)
    category = Column(Text)
    images = Column(Text)
    destination_id = Column(Text, ForeignKey("destination.id"))

    rooms = relationship("Room", backref="hotel")

    def __repr__(self):
        return f"Hotel(id={self.id}, name={self.name}, loc=({self.latitude}, {self.longitude}), price={self.avg_price}, description={self.description})"


class Room(Base):
    __tablename__ = "room"

    id = Column(Integer, primary_key=True)
    name = Column(Text)
    price = Column(Integer)
    description = Column(Text)
    # TODO: Check if we should store image URLs as serialized string
    # note: ^ they are stored with 3 strings - suffix (eg. jpg), count (eg. 10), prefix (https://....)
    # image index that stores the total from e.g. 0 to 30 ^ used in the count to retrieve img
    ## this is for hotels tho, not sure how to pinpoint for each room
    images = Column(Text)
    hotel_id = Column(Integer, ForeignKey("hotel.id"))

    def __repr__(self):
        return f"Room(id={self.id}, name={self.name}, price={self.price}, description={self.description}, images={self.images})"


class Booking(Base):
    __tablename__ = "booking"

    id = Column(Integer, primary_key=True)
    booking_display_info = Column(Text)
    booking_price = Column(Integer)
    # TODO: Check booking ID type with Ascenda
    supplier_booking_ID = Column(Integer)
    supplier_booking_ref = Column(Integer)
    guest_booking_ref = Column(Integer)
    # TODO: Change this to a relationship with GuestInfo
    guest_account_info = Column(Text)
    # TODO: Change this to a relationship with PaymentInfo
    guest_payment_info = Column(Text)
    # TODO: Add relationship to hotel, room, and destination?
    destination = relationship("Destination", backref="booking")

    def __repr__(self):
        return f"Booking(id={self.id}, booking_disp_info={self.booking_display_info}, booking_price={self.booking_price}, )"


class PaymentInfo(Base):
    __tablename__ = "paymentinfo"

    id = Column(Integer, primary_key=True)
    payee_name = Column(Text)
    payee_id = Column(Integer)
    payment_id = Column(Integer)
    # TODO: Consider splitting address as its own table / serialize for easy reference
    billing_address = Column(Text)
    stripe_customer_id = Column(Text)

    def __repr__(self):
        # TODO: Fill this in
        return f""


class GuestInfo(Base):
    __tablename__ = "guestinfo"

    id = Column(Integer, primary_key=True)
    # TODO: Shift enum to config file
    salutation = Column(Enum(*["Mr", "Ms", "Mrs", "Miss", "Dr"]))
    first_name = Column(Text)
    last_name = Column(Text)
    # TODO: Determine data type for this
    contact_number = Column(Text)
    # TODO: Include email regex-ing
    email = Column(Text)
    special_requests = Column(Text)

    def __repr__(self):
        # TODO: Fill this in
        return f""
