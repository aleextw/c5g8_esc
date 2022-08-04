import datetime
from lib2to3.pgen2 import token
import time
import hashlib
import uuid

from fastapi.testclient import TestClient

from ..__main__ import app
from ..core.models.database import *

client = TestClient(app)
salt = uuid.uuid4()
passwordHash = hashlib.sha256(b"testPassword123" +  salt.bytes).hexdigest()

global user_token

def test_register_user_missing_email():
    """
    Should not register a new user given missing email
    """
    registration_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "",
        "phoneNumber": "12345678",
        "username": "johndoe1234",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Email cannot be empty."


def test_register_user_invalid_email():
    """
    Should not register a new user given invalid email
    """
    registration_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "aslkdjasldkj",
        "phoneNumber": "12345678",
        "username": "johndoe1234",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Please enter a valid email."


def test_register_user_missing_username():
    """
    Should not register a new user given missing username
    """
    registration_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "test@gmail.com",
        "phoneNumber": "12345678",
        "username": "",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Username cannot be empty."


def test_register_user_special_chars_username():
    """
    Should not register a new user given special characters in username
    """
    registration_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "test@gmail.com",
        "phoneNumber": "12345678",
        "username": "sp#ci@lch@r5",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Please enter a valid username."


def test_register_user_missing_phone():
    """
    Should not register a new user given missing phone
    """
    registration_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "test@gmail.com",
        "phoneNumber": "",
        "username": "johndoe123",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Phone number cannot be empty."


def test_register_user_invalid_phone():
    """
    Should not register a new user given special characters in phone number
    """
    registration_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "test@gmail.com",
        "phoneNumber": "asdlkjasdlkj",
        "username": "johndoe123",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Please enter a valid phone number."


def test_register_user_missing_first():
    """
    Should not register a new user given missing first name
    """
    registration_data = {
        "firstName": "",
        "lastName": "Doe",
        "email": "test@gmail.com",
        "phoneNumber": "12345678",
        "username": "johndoe123",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: First name cannot be empty."

def test_register_user_missing_last():
    """
    Should not register a new user given missing last name
    """
    registration_data = {
        "firstName": "John",
        "lastName": "",
        "email": "test@gmail.com",
        "phoneNumber": "12345678",
        "username": "johndoe123",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Last name cannot be empty."


def test_register_user_invalid_first():
    """
    Should not register a new user given first name with special characters
    """
    registration_data = {
        "firstName": "j@!n5",
        "lastName": "Doe",
        "email": "test@gmail.com",
        "phoneNumber": "12345678",
        "username": "johndoe123",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: First name cannot have special characters."


def test_register_user_invalid_last():
    """
    Should not register a new user given last name with special characters
    """
    registration_data = {
        "firstName": "John",
        "lastName": "D()@#",
        "email": "test@gmail.com",
        "phoneNumber": "12345678",
        "username": "johndoe123",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Last name cannot have special characters."


def test_register_user_valid_data():
    """
    Should register a new user and return a token given valid registration data
    """
    registration_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "test@gmail.com",
        "phoneNumber": "12345678",
        "username": "johndoe123",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid", "token", "user"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == ""
    assert isinstance(data["token"], str)
    assert len(data["token"]) > 0
    assert isinstance(data["user"], dict)
    assert set(data["user"].keys()) == set(["firstName", "lastName", "email", "phoneNumber", "username"])


def test_register_user_existing_email():
    """
    Should not register a new user given existing email
    """
    registration_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "test@gmail.com",
        "phoneNumber": "12345678",
        "username": "johndoe123",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Email already in use."


def test_register_user_existing_username():
    """
    Should not register a new user given existing username
    """
    registration_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "test1@gmail.com",
        "phoneNumber": "12345678",
        "username": "johndoe123",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Username already in use."
    

def test_register_user_existing_phone():
    """
    Should not register a new user given existing phone number
    """
    registration_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "test1@gmail.com",
        "phoneNumber": "12345678",
        "username": "johndoe1234",
        "passwordHash": passwordHash,
        "salt":  salt.hex,
    }

    response = client.post(
        "/register",
        json=registration_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Phone number already in use."


def test_login_user_valid_data():
    """
    Should login user given valid login data
    """
    login_query_data = {
        "type": "query",
        "username": "johndoe123",
    }

    response = client.post(
        "/login",
        json=login_query_data,
    )

    assert response.status_code == 200
    data = response.json()
    print(data)
    assert set(data.keys()) == set(["valid", "salt"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == ""
    assert isinstance(data["salt"], str)
    assert len(data["salt"]) > 0

    login_data = {
        "type": "login",
        "username": "johndoe123",
        "passwordHash": hashlib.sha256(b"testPassword123" + bytes.fromhex(response.json()["salt"])).hexdigest(),
    }

    response = client.post(
        "/login",
        json=login_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid", "token", "user"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == ""
    assert isinstance(data["token"], str)
    assert len(data["token"]) > 0
    assert isinstance(data["user"], dict)
    assert set(data["user"].keys()) == set(["firstName", "lastName", "email", "phoneNumber", "username"])

    global user_token
    user_token = data["token"]


def test_profile_user_valid_data():
    """
    Should retrieve user profile given valid auth data
    """
    global user_token
    auth_data = {
        "username": "johndoe123",
        "token": user_token
    }

    response = client.post(
        "/profile",
        json=auth_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid", "user"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == ""
    assert isinstance(data["user"], dict)
    assert set(data["user"].keys()) == set(["firstName", "lastName", "email", "phoneNumber", "username"])


def test_logout_user_valid_data():
    """
    Should logout user given valid auth data
    """
    global user_token
    auth_data = {
        "username": "johndoe123",
        "token": user_token
    }

    response = client.post(
        "/logout",
        json=auth_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == ""

    response = client.post(
        "/profile",
        json=auth_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Token does not exist."


def test_login_user_invalid_username():
    """
    Should not login user given invalid username
    """
    login_query_data = {
        "type": "query",
        "username": "nonexistentUser123",
    }

    response = client.post(
        "/login",
        json=login_query_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: User does not exist."


def test_login_user_empty_username():
    """
    Should not login user given empty username
    """
    login_query_data = {
        "type": "query",
        "username": "",
    }

    response = client.post(
        "/login",
        json=login_query_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Username cannot be empty."


def test_login_user_invalid_password():
    """
    Should not login user given invalid password
    """
    login_query_data = {
        "type": "query",
        "username": "johndoe123",
    }

    response = client.post(
        "/login",
        json=login_query_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid", "salt"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == ""
    assert isinstance(data["salt"], str)
    assert len(data["salt"]) > 0

    login_data = {
        "type": "login",
        "username": "johndoe123",
        "passwordHash": hashlib.sha256(b"invalidPassword123" + bytes.fromhex(response.json()["salt"])).hexdigest(),
    }

    response = client.post(
        "/login",
        json=login_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Invalid credentials provided."


def test_logout_user_invalid_token():
    """
    Should error on invalid token
    """
    auth_data = {
        "username": "johndoe123",
        "token": "invalidToken123"
    }

    response = client.post(
        "/logout",
        json=auth_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Token does not exist."


def test_logout_user_empty_token():
    """
    Should error on empty token
    """
    auth_data = {
        "username": "johndoe123",
        "token": ""
    }

    response = client.post(
        "/logout",
        json=auth_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Missing token."


def test_logout_user_empty_username():
    """
    Should error on empty token
    """
    auth_data = {
        "username": "",
        "token": "validToken123"
    }

    response = client.post(
        "/logout",
        json=auth_data,
    )

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == set(["valid"])
    assert isinstance(data["valid"], str)
    assert data["valid"] == "Error: Missing username."


def test_delete_user_valid_data():
    """
    Should delete user given valid auth data
    """
    login_query_data = {
        "type": "query",
        "username": "johndoe123",
    }

    login_query_response = client.post(
        "/login",
        json=login_query_data,
    )

    login_data = {
        "type": "login",
        "username": "johndoe123",
        "passwordHash": hashlib.sha256(b"testPassword123" + bytes.fromhex(login_query_response.json()["salt"])).hexdigest(),
    }

    login_response = client.post(
        "/login",
        json=login_data,
    )

    auth_data = {
        "username": "johndoe123",
        "token": login_response.json()["token"],
    }

    delete_response = client.post(
        "/profile/delete",
        json=auth_data,
    )

    assert delete_response.status_code == 200
    data = delete_response.json()
    assert set(data.keys()) == set(["valid"])
    assert data["valid"] == ""

    delete_login_response = client.post(
        "/login",
        json=login_data,
    )

    assert delete_login_response.status_code == 200
    data = delete_login_response.json()
    assert set(data.keys()) == set(["valid"])
    assert data["valid"] == "Error: User does not exist."



