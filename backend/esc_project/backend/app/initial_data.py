#!/usr/bin/env python3

from app.db.session import get_db
from app.db.crud import create_user
from app.db.schemas import UserCreate
from app.db.session import SessionLocal


def init() -> None:
    db = SessionLocal()

    create_user(
        db,
        UserCreate(
            email="alex_leetzewei@mymail.sutd.edu.sg",
            password="X@TBNC#sN^oNt9",
            is_active=True,
            is_superuser=True,
        ),
    )


if __name__ == "__main__":
    print("Creating superuser alex_leetzewei@mymail.sutd.edu.sg")
    init()
    print("Superuser created")
