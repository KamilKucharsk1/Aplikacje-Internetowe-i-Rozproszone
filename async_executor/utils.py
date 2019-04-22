from celery import Celery


def make_celery(flask_app):
    """ makes celery application based on flask app """
    celery_app = Celery(flask_app.import_name,
                        backend=flask_app.config['CELERY_BROKER_URI'],
                        broker=flask_app.config['CELERY_BACKEND_URI'])

    celery_app.conf.update(flask_app.config)

    class ContextTask(celery_app.Task):
        def __call__(self, *args, **kwargs):
            with flask_app.app_context():
                return self.run(*args, **kwargs)

    celery_app.Task = ContextTask

    return celery_app


def make_process_result(completed_process):
    """ makes result dict based on completed process """
    return {
        'stderr': completed_process.stderr.decode(),
        'stdout': completed_process.stdout.decode(),
        'returncode': completed_process.returncode
    }


def make_task_status(redis_task):
    """ converts redis_task to dict """
    return redis_task.__dict__['_data']


def refresh_task(redis_task, celery_app):
    """ updates redis_task's content if neccessary """
    if redis_task.returncode is not None:
        """ redis_task has been already updated """
        return redis_task
    celery_task = celery_app.AsyncResult(id=redis_task.id)
    if celery_task.ready():
        """ redis_task does not contain result """
        celery_result = celery_task.get()
        redis_task.stdout = celery_result['stdout']
        redis_task.stderr = celery_result['stderr']
        redis_task.returncode = celery_result['returncode']
        redis_task.state = celery_task.state
        redis_task.save()
    elif redis_task.state != celery_task.state:
        """ celery_task is not ready, but its state has changed """
        redis_task.state = celery_task.state
        redis_task.save()
    return redis_task
