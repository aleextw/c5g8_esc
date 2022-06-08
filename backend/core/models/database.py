from datetime import datetime
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

from base import Base
from config import config
from esc_backend.core.schema import ErrorMapper, Lecture, Submission, Student

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


def read_csv(file_name, headers=False):
    """
    Read a CSV file and return as a nested list
    """
    # TODO: Add file checking and error handling
    with open(file_name, "r") as fp:
        if headers:
            fp.readline()
        return [[x.strip() for x in y.split(",")] for y in fp.read().split("\n")]


def setup():
    """
    Call load() and inserts data from template files specified by config.
    Returns None on error.
    """
    session = reset()
    if session is None:
        return None

    setup_files = {
        "SUBMISSION_SETUP_FILE": config.get("SUBMISSION_SETUP_FILE", None),
        "STUDENT_ID_SETUP_FILE": config.get("STUDENT_ID_SETUP_FILE", None),
        "ERROR_CODE_SETUP_FILE": config.get("ERROR_CODE_SETUP_FILE", None),
        "LECTURE_SETUP_FILE": config.get("LECTURE_SETUP_FILE", None),
    }

    if not any(map(lambda x: x is None, setup_files.values())):
        setup_data = {
            file_name: read_csv(file_data, headers=config.get("HEADERS", False))
            for file_name, file_data in setup_files.items()
        }

        try:
            student_setup(setup_data["STUDENT_ID_SETUP_FILE"], session)
            submission_setup(setup_data["SUBMISSION_SETUP_FILE"], session)

            # TODO: Shift to convenience function like the other files
            for i in setup_data["ERROR_CODE_SETUP_FILE"]:
                error_mapper = ErrorMapper(error_id=i[0], error_message=i[1])
                session.add(error_mapper)

            # TODO: Shift to convenience function like the other files
            for i in setup_data["LECTURE_SETUP_FILE"]:
                lecture = Lecture(
                    lecture_type=i[0],
                    due_date=int(datetime.strptime(i[1], "%d/%m/%Y %H:%M").timestamp()),
                )
                session.add(lecture)

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


def reload_setup():
    """
    Reload submission_setup.csv and student_id_setup.csv files, comparing diffs with current db and updating it
    TODO: reload error_mapper.csv
    """
    session = config["SESSION"]

    if session is None:
        return None

    setup_files = {
        "SUBMISSION_SETUP_FILE": config.get("SUBMISSION_SETUP_FILE", None),
        "STUDENT_ID_SETUP_FILE": config.get("STUDENT_ID_SETUP_FILE", None),
        "ERROR_CODE_SETUP_FILE": config.get("ERROR_CODE_SETUP_FILE", None),
    }

    if not any(map(lambda x: x is None, setup_files.values())):
        setup_data = {
            file_name: read_csv(file_data, headers=config.get("HEADERS", False))
            for file_name, file_data in setup_files.items()
        }

        try:
            # update telegram username
            student_setup(setup_data["STUDENT_ID_SETUP_FILE"], session)

            # update submission due date or max points
            submission_setup(setup_data["SUBMISSION_SETUP_FILE"], session)

            # update error message
            error_message_setup(setup_data["ERROR_CODE_SETUP_FILE"], session)

            session.commit()
            return session
        except Exception as ex:
            session.rollback()
            session.close()
            logger.error("Failed to insert data during setup. Traceback: %s", ex)
            return None


def student_setup(data, session):
    """
    Set up Student table
    If matching record is found (based on student ID), record is updated
    Else, new entry is created
    """
    for i in data:
        student_entry = session.execute(
            select(Student).where(Student.student_id == int(i[0]))
        ).first()

        if student_entry is None:
            student = Student(student_id=int(i[0]), telegram_handle=i[1].lower())
            session.add(student)
        else:
            # Remove redundant value check
            # If the values are the same, we can update regardless
            student_entry[0].telegram_handle = i[1].lower()


def error_message_setup(data, session):
    """
    Set up error table
    If matching record is found (based on error ID), record is updated
    Else, new entry is created
    """
    for i in data:
        error_entry = session.execute(
            select(ErrorMapper).where(ErrorMapper.error_id == int(i[0]))
        ).first()

        if error_entry is None:
            error = ErrorMapper(error_id=int(i[0]), error_message=i[1].lower())
            session.add(error)
        else:
            # Remove redundant value check
            # If the values are the same, we can update regardless
            error_entry[0].error_message = i[1]


def submission_setup(data, session):
    """
    Set up Submission table
    If matching record is found (based on description), record is updated
    Else, new entry is created
    """
    for i in data:
        submission = session.execute(
            select(Submission).where(Submission.description == i[0])
        ).first()

        due_date = int(datetime.strptime(i[1], "%d/%m/%Y %H:%M").timestamp())
        max_points = int(i[2])

        if submission is None:
            submission = Submission(
                description=i[0],
                due_date=due_date,
                max_points=max_points,
                max_submissions=int(i[3]),
                grade_function=i[4],
                requirements=i[5],
                required_files=", ".join(i[6:]),
            )

            session.add(submission)
        else:
            # Remove redundant value check
            # If the values are the same, we can update regardless
            submission[0].due_date = due_date
            submission[0].max_points = max_points
