# aiir

## Deployment
`docker-compose up -d --build`

**TODO:** docker swarm (publish images mainly)

## Apps
- fate.app **\<int\>**, waits random amount of time and then returns 0 or 1

## Endpoints
Endpoints listed below are published on port **5000**.
- POST /task, creates task with a given args
- GET /task/\<id\>, retrieves task current status
- GET /tasks, retireves all tasks statuses
- GET /apps, retrieves all allowed execution commands

### Task Queue View
Tasks can be viewed in RabbitMQ management app served on port **15672**.

## Usage

Dispatch app's execution: `curl -XPOST -H 'Content-Type: application/json' localhost:5000/task -d '{"args": "./fate.app 77"}'`

Watch all tasks: `curl -s -XGET 'localhost:5000/tasks`
