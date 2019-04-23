from . import redis_db

import walrus


class Task(walrus.Model):
    __database__ = redis_db

    id = walrus.TextField(primary_key=True)

    args = walrus.TextField()

    stdout = walrus.TextField()
    stderr = walrus.TextField()

    returncode = walrus.IntegerField()

    state = walrus.TextField()
