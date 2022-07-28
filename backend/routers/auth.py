# pylint: disable=no-name-in-module
# pylint: disable=no-self-argument
import logging

from fastapi import APIRouter
from pydantic import BaseModel

from backend.core.models import database

router = APIRouter()

logger = logging.getLogger()

# TODO: Shift data models to separate file for cleaner code
class RegistrationData(BaseModel):
    """
    Data passed by the frontend corresponding to a hotel room booking
    """

    firstName: str
    lastName: str
    email: str
    phoneNumber: str
    username: str
    passwordHash: str
    salt: str


class LoginData(BaseModel):
    type: str
    username: str
    passwordHash: str | None = None


class AuthData(BaseModel):
    username: str
    token: str


@router.post("/register", tags=["auth"])
def register(registration_data: RegistrationData):
    return database.register_user(registration_data)


@router.post("/login", tags=["auth"])
def login(login_data: LoginData):
    return database.login_user(login_data)


@router.post("/logout", tags=["auth"])
def logout(logout_data: AuthData):
    return database.logout_user(logout_data)


@router.post("/profile", tags=["auth"])
def get_user_data(auth_data: AuthData):
    return database.get_user_data(auth_data)


@router.post("/profile/delete", tags=["auth"])
def delete_user_data(auth_data: AuthData):
    return database.delete_user_data(auth_data)
