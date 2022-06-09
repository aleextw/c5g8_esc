from logging.handlers import TimedRotatingFileHandler
import logging

from config import config


def start_logger():
    log_name = config.get("LOG_NAME", None)
    log_level = config.get("LOG_LEVEL", 10)

    if log_name is not None:
        log_format = "%(asctime)s (%(levelname)s): %(message)s"
        formatter = logging.Formatter(log_format)

        handler = TimedRotatingFileHandler(log_name, when="midnight", interval=1)
        handler.suffix = "%y%m%d"
        handler.setFormatter(formatter)

        logger = logging.getLogger()
        logger.setLevel(log_level)
        logger.addHandler(handler)

        return logger

    print("LOG_NAME not set up in config.")
    return None
