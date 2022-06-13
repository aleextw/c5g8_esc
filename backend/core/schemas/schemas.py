from sqlalchemy import Column, Enum, Float, ForeignKey, Integer, Numeric, Text
from sqlalchemy.orm import relationship

from backend.core.models.base import Base

class Destination(Base):
    __tablename__ = "destination"
    
    id = Column(Integer, primary_key=True)
    uid = Column(Text)
    term = Column(Text)
    # latitude = Column(float)
    # longitude = Column(float)
    # state = Column(Text)
    # type = Column(Text)
        
    booking_id = Column(Integer, ForeignKey("booking.id"))
    

    def __repr__(self):
        return f"Destination(id={self.id}, name={self.name}, booking_id={self.booking_id})"


class Hotel(Base):
    __tablename__ = "hotel"

    id = Column(Integer, primary_key=True)
    uid = Column(Text)
    # was thinking we would not need a relational db? just an attribute to link it back to dest
    destination_id = Column(Text)
    
    name = Column(Text)
    address = Column(Text)
    rating = Column(Float)
    # check score data type
    score = Column(JSON)
    price = Column(Float)
    # check image_details data type
    image_details = Column(JSON)
    description = Column(Text)
    # check amenities data type
    amenities = Column(JSON)
    # those below only used for hotel details
    latitude = Column(Float)
    longitude = Column(Float)
    
    rooms = relationship("Room", backref="hotel")

    def __repr__(self):
        return f"Hotel(id={self.id}, name={self.name}, loc=({self.latitude}, {self.longitude}), price={self.avg_price}, description={self.description})"


class Room(Base):
    __tablename__ = "room"

    id = Column(Integer, primary_key=True)
    key = Column(Text)
    roomNormalizedDescription = Column(Text)
    market_rates = Column(JSON)
    # check images data type
    images = Column(JSON)
    description = Column(Text)
    # check amenities data type
    amenities = Column(JSON)
    free_cancellation = Column(Boolean)
    # check data type
    roomAdditionalInfo = Column(JSON)
    
    hotel_id = Column(Integer, ForeignKey("destination.id"))

    def __repr__(self):
        return f"Room(id={self.id}, name={self.name}, price={self.price}, description={self.description}, images={self.images})"


class Booking(Base):
    __tablename__= "booking"

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
    salutation = Column(Enum(["Mr", "Ms", "Mrs", "Miss", "Dr"]))
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