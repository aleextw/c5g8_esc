from sqlalchemy import Column, Date, Enum, Float, ForeignKey, Integer, Text
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
    booking = relationship("Booking", backref="destination", uselist=False)

    def as_dict(self):
        """
        Return table entry attributes as a dict
        """
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return f"Destination(id={self.id}, term={self.term}, state={self.state}, lat={self.latitude}, lon={self.longitude}, destination_type={self.destination_type}, destination_id={self.destination_id})"


class Booking(Base):
    """
    Represents a finalized booking
    """

    __tablename__ = "booking"

    id = Column(Integer, primary_key=True)
    room_uid = Column(Text)
    hotel_uid = Column(Text)
    price = Column(Float)
    booking_display_info = relationship("DisplayInfo", backref="booking", uselist=False)
    guest_booking_ref = Column(Text)
    guest_account_info = relationship("GuestInfo", backref="booking", uselist=False)
    guest_payment_info = relationship("PaymentInfo", backref="booking", uselist=False)
    hotel_destination = Column(Text, ForeignKey("destination.destination_id"))
    assigned_user = Column(Text, ForeignKey("user.username"))

    def as_dict(self):
        """
        Return table entry attributes as a dict
        """
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return f"Booking(id={self.id}, room_uid={self.room_uid}, hotel_uid={self.hotel_uid}, price={self.price})"


class DisplayInfo(Base):
    """
    Represents the display information of a booking
    """

    __tablename__ = "displayinfo"

    id = Column(Integer, primary_key=True)
    room_name = Column(Text)
    hotel_name = Column(Text)
    check_in_date = Column(Date)
    check_out_date = Column(Date)
    num_adults = Column(Integer)
    num_children = Column(Integer)
    num_rooms = Column(Integer)
    booking_ref = Column(Text, ForeignKey("booking.guest_booking_ref"))

    def as_dict(self):
        """
        Return table entry attributes as a dict
        """
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return f"DisplayInfo(id={self.id}, room_name={self.room_name}, hotel_name={self.hotel_name}, check_in_date={self.check_in_date}, check_out_date={self.check_out_date}, num_adults={self.num_adults}, num_children={self.num_children}, num_rooms={self.num_rooms})"


class PaymentInfo(Base):
    """
    Represents the payment information of a guest
    """

    __tablename__ = "paymentinfo"

    id = Column(Integer, primary_key=True)
    card_name = Column(Text)
    card_number = Column(Text)
    billing_address = Column(Text)
    booking_ref = Column(Text, ForeignKey("booking.guest_booking_ref"))

    def as_dict(self):
        """
        Return table entry attributes as a dict
        """
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return f"PaymentInfo(id={self.id}, card_name={self.card_name}, card_number={self.card_number}, billing_address={self.billing_address})"


class GuestInfo(Base):
    """
    Represents the personal information of a guest
    """

    __tablename__ = "guestinfo"

    id = Column(Integer, primary_key=True)
    salutation = Column(
        Enum("Mr", "Ms", "Mrs", "Miss", "Madam", "Dr", "Lord", "Lordess")
    )
    first_name = Column(Text)
    last_name = Column(Text)
    # Email regex handled clientside
    email = Column(Text)
    contact_number = Column(Text)
    additional_data = Column(Text)
    booking_ref = Column(Text, ForeignKey("booking.guest_booking_ref"))

    def as_dict(self):
        """
        Return table entry attributes as a dict
        """
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return f"GuestInfo(id={self.id}, salutation={self.salutation}, first_name={self.first_name}, last_name={self.last_name}, email={self.email}, contact_number={self.contact_number}, additional_data={self.additional_data})"


class User(Base):
    """
    Represents a user account in the application
    """

    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    first_name = Column(Text)
    last_name = Column(Text)
    email = Column(Text)
    phone_number = Column(Text)
    username = Column(Text)
    password_hash = Column(Text)
    salt = Column(Text)
    token_val = Column(Text, ForeignKey("token.value"))
    bookings = relationship("Booking", backref="user")

    def as_dict(self):
        """
        Return table entry attributes as a dict
        """
        # Autistic but necessary to maintain codebase standards
        # JS in camelCase
        # Python in snake_case
        return {
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "phoneNumber": self.phone_number,
            "username": self.username,
        }

    def __repr__(self):
        return f"User(id={self.id}, first_name={self.first_name}, last_name={self.last_name}, email={self.email}, phone_number={self.phone_number}, username={self.username})"


class Token(Base):
    """
    Represents an authorization token for a user
    """

    __tablename__ = "token"

    id = Column(Integer, primary_key=True)
    value = Column(Text)
    assigned_user = relationship("User", backref="token", uselist=False)

    def as_dict(self):
        """
        Return table entry attributes as a dict
        """
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def __repr__(self):
        return f"Token(id={self.id}, value={self.value})"
