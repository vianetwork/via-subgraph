include .example.env

up:
	docker compose up --build

down:
	docker compose down -v

# ETH Monitor (formerly L1 Monitor)
install-eth:
	cd subgraphs/eth-monitor && npm install

codegen-eth:
	cd subgraphs/eth-monitor && npm run codegen

build-eth:
	cd subgraphs/eth-monitor && npm run build

create-local-eth:
	cd subgraphs/eth-monitor && npm run create-local

deploy-local-eth:
	cd subgraphs/eth-monitor && npm run deploy-local

remove-local-eth:
	cd subgraphs/eth-monitor && npm run remove-local

test-eth:
	cd subgraphs/eth-monitor && npm test

# L2 Monitor (combined L2 subgraph)
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

test-l2:
	cd subgraphs/l2-monitor && npm test

# Global
install-all: install-eth install-l2

codegen-all: codegen-eth codegen-l2

build-all: build-eth build-l2

create-all-local: create-local-eth create-local-l2

deploy-all-local: deploy-local-eth deploy-local-l2

test-all: test-eth test-l2

.PHONY: up down install-eth codegen-eth build-eth create-local-eth deploy-local-eth remove-local-eth test-eth install-l2 codegen-l2 build-l2 create-local-l2 deploy-local-l2 remove-local-l2 test-l2 install-all codegen-all build-all deploy-all-local test-all
