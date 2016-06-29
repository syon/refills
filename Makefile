
build: node_modules
	node build

node_modules: package.json
	npm install

serve: refills
	node serve

.PHONY: build
