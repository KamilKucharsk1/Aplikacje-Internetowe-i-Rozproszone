from . import celery_app
from . import utils

import subprocess


@celery_app.task
def execute(args, cwd=None):
    """ executes command on the celery worker
        and returns dict with a result """
    completed_process = subprocess.run(
        args=args,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        cwd=cwd
    )
    return utils.make_process_result(completed_process)
