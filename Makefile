include .example.env

up:
	docker compose up --build

down:
	docker compose down -v

.PHONY: up down
