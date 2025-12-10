include .example.env

up:
	docker compose up --build -d

down:
	docker compose down -v

.PHONY: up down
