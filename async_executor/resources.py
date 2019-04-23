from flask_restful import Resource
from flask_restful import reqparse
from flask_restful import abort

from . import models
from . import tasks
from . import utils
from . import celery_app

from . import CELERY_WORKER_CWD
from . import CELERY_WORKER_CMDS


class TaskGet(Resource):
    def get(self, id):
        try:
            redis_task = models.Task.load(id)
        except KeyError:
            abort(
                http_status_code=404,
                message=f"task with id '{id}' does not exist"
            )
        utils.refresh_task(redis_task, celery_app)
        return utils.make_task_status(redis_task)


class TaskAdd(Resource):
    def __init__(self):
        super().__init__()
        self.parser = reqparse.RequestParser()
        self.parser.add_argument('args', type=str, location='json')

    def post(self):
        request_data = self.parser.parse_args()
        splitted_args = request_data['args'].split()
        command = splitted_args[0]
        if command not in CELERY_WORKER_CMDS:
            abort(
                http_status_code=405,
                message=f"command '{command}' is not allowed"
            )
        celery_task = tasks.execute.delay(
            args=splitted_args,
            cwd=CELERY_WORKER_CWD
        )
        redis_task = models.Task.create(
            id=celery_task.task_id,
            args=request_data['args'],
            state=celery_task.state
        )
        return utils.make_task_status(redis_task)


class Tasks(Resource):
    def get(self):
        return [
            utils.make_task_status(utils.refresh_task(redis_task, celery_app))
            for redis_task in models.Task.all()
        ]


class AppsInfo(Resource):
    def get(self):
        return CELERY_WORKER_CMDS
