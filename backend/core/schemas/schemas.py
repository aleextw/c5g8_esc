from sqlalchemy import Column, Enum, Float, ForeignKey, Integer, Numeric, Text
from sqlalchemy.orm import relationship

from backend.core.models.base import Base


class Destination(Base):
    """
    Represents a searchable destination
    """

    __tablename__ = "destination"

    id = Column(Integer, primary_key=True)
    term = Column(Text)
    state = Column(Text)
    destination_type = Column(Text)
    destination_id = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)
    booking_id = relationship("Booking", backref="destination")

    def __repr__(self):
        return (
            f"Destination(id={self.id}, name={self.name}, booking_id={self.booking_id})"
        )


class Booking(Base):
    """
    Represents a finalized booking
    """

    __tablename__ = "booking"

    id = Column(Integer, primary_key=True)
    booking_display_info = Column(Text)
    price = Column(Float)
    guest_booking_ref = Column(Text)
    # TODO: Change this to a relationship with GuestInfo
    guest_account_info = relationship("GuestInfo", backref="booking")
    # TODO: Change this to a relationship with PaymentInfo
    guest_payment_info = relationship("PaymentInfo", backref="booking")
    destination_id = Column(Text, ForeignKey("destination.id"))

    def __repr__(self):
        return f"Booking(id={self.id}, booking_disp_info={self.booking_display_info}, booking_price={self.booking_price}, )"


class PaymentInfo(Base):
    """
    Represents the payment information of a guest
    """

    __tablename__ = "paymentinfo"

    id = Column(Integer, primary_key=True)
    payee_name = Column(Text)
    payee_id = Column(Integer)
    payment_id = Column(Integer)
    # TODO: Consider splitting address as its own table / serialize for easy reference
    billing_address = Column(Text)
    booking_id = Column(Text, ForeignKey("booking.id"))

    def __repr__(self):
        # TODO: Fill this in
        return f""


class GuestInfo(Base):
    """
    Represents the personal information of a guest
    """

    __tablename__ = "guestinfo"

    id = Column(Integer, primary_key=True)
    # TODO: Shift enum to config file
    salutation = Column(Enum("Mr", "Ms", "Mrs", "Miss", "Dr"))
    first_name = Column(Text)
    last_name = Column(Text)
    # TODO: Determine data type for this
    contact_number = Column(Text)
    # TODO: Include email regex-ing
    email = Column(Text)
    special_requests = Column(Text)
    booking_id = Column(Text, ForeignKey("booking.id"))

    def __repr__(self):
        # TODO: Fill this in
        return f""
