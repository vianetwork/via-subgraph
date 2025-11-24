include .example.env

up:
	docker compose up --build

down:
	docker compose down -v

# L1 Monitor
install-l1:
	cd subgraphs/l1-monitor && npm install

codegen-l1:
	cd subgraphs/l1-monitor && npm run codegen

build-l1:
	cd subgraphs/l1-monitor && npm run build

create-local-l1:
	cd subgraphs/l1-monitor && npm run create-local

deploy-local-l1:
	cd subgraphs/l1-monitor && npm run deploy-local

remove-local-l1:
	cd subgraphs/l1-monitor && npm run remove-local

# L2 Monitor
install-l2:
	cd subgraphs/l2-monitor && npm install

codegen-l2:
	cd subgraphs/l2-monitor && npm run codegen

build-l2:
	cd subgraphs/l2-monitor && npm run build

create-local-l2:
	cd subgraphs/l2-monitor && npm run create-local

deploy-local-l2:
	cd subgraphs/l2-monitor && npm run deploy-local

remove-local-l2:
	cd subgraphs/l2-monitor && npm run remove-local

# L2 Base Token
install-base:
	cd subgraphs/l2-base-token && npm install

codegen-base:
	cd subgraphs/l2-base-token && npm run codegen

build-base:
	cd subgraphs/l2-base-token && npm run build

create-local-base:
	cd subgraphs/l2-base-token && npm run create-local

deploy-local-base:
	cd subgraphs/l2-base-token && npm run deploy-local

remove-local-base:
	cd subgraphs/l2-base-token && npm run remove-local

# Global
install-all: install-l1 install-l2 install-base

codegen-all: codegen-l1 codegen-l2 codegen-base

build-all: build-l1 build-l2 build-base

deploy-all-local: deploy-local-l1 deploy-local-l2 deploy-local-base

.PHONY: up down install-l1 codegen-l1 build-l1 create-local-l1 deploy-local-l1 remove-local-l1 install-l2 codegen-l2 build-l2 create-local-l2 deploy-local-l2 remove-local-l2 install-base codegen-base build-base create-local-base deploy-local-base remove-local-base install-all codegen-all build-all deploy-all-local
