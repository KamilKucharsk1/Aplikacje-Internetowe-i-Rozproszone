"""
    async_executor is async task scheduler driven by REST Api

    __init__.py initializes FlaskApp, FlaskApi, and CeleryApp

    an appliaction can be configured via environment variables:
    - CELERY_BROKER_URI, e.g.: 'amqp://broker:5672'
    - CELERY_BACKEND_URI, e.g.: 'redis://backend:6379'
    - REDIS_DB_URI, e.g.: 'redis://db:6379'
"""

from flask import Flask as FlaskApp
from flask_restful import Api as FlaskApi
from .utils import make_celery as CeleryApp
from walrus import Database as RedisDatabase

import os
import glob

flask_app = FlaskApp(__name__)

flask_app.config.update(
    CELERY_BROKER_URI=os.getenv('CELERY_BROKER_URI', 'amqp://broker:5672'),
    CELERY_BACKEND_URI=os.getenv('CELERY_BACKEND_URI', 'redis://backend:6379')
)

flask_api = FlaskApi(flask_app)

celery_app = CeleryApp(flask_app)

REDIS_DB_URI = os.getenv('REDIS_DB_URI', 'redis://db:6379')
REDIS_DB_HOST, REDIS_DB_PORT = REDIS_DB_URI[8:].split(':')

redis_db = RedisDatabase(
    host=REDIS_DB_HOST,
    port=REDIS_DB_PORT
)

CELERY_WORKER_CWD = 'apps'
CELERY_WORKER_CMDS = [
    './' + os.path.basename(path)
    for path in glob.glob(f'{CELERY_WORKER_CWD}/*.app')
]
