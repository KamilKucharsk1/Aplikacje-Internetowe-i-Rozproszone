""" main.py is an entry point for flask and celery"""

from . import flask_app   # required by flask run
from . import celery_app  # required by celery worker

from . import resources
from . import flask_api

# routing definitions

flask_api.add_resource(resources.TaskGet, '/task/<id>')
flask_api.add_resource(resources.TaskAdd, '/task')
flask_api.add_resource(resources.Tasks, '/tasks')
flask_api.add_resource(resources.AppsInfo, '/apps')

from . import tasks       # required by celery worker
