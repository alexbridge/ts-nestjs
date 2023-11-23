SHELL := /bin/bash

start: stop
	docker compose up --build --detach --wait app
stop:
	docker compose down --volumes
