FROM python:3.7.3-alpine

RUN pip3 install --no-cache-dir "celery==4.3.0"
RUN pip3 install --no-cache-dir "flask==1.0.2"
RUN pip3 install --no-cache-dir "flask-restful==0.3.7"
RUN pip3 install --no-cache-dir "walrus==0.7.1"

RUN apk add 'make=4.2.1-r2'
RUN apk add 'gcc=8.3.0-r0'
RUN apk add 'libc-dev=0.7.1-r0'

COPY async_executor async_executor
COPY apps apps

RUN make -C ./apps

EXPOSE 5000
