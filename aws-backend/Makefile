.PHONY: build-RuntimeDependenciesLayer build-lambda-common
.PHONY: build-SendDailyEmailFunction \
			 	build-SubscribeEmailFunction


build-SendDailyEmailFunction:
	$(MAKE) HANDLER=src/handlers/send-daily-email.ts build-lambda-common

build-SubscribeEmailFunction:
	$(MAKE) HANDLER=src/handlers/subscribe-email.ts build-lambda-common

build-lambda-common:
	yarn install
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	yarn build --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-RuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json yarn.lock "$(ARTIFACTS_DIR)/nodejs/"
	yarn "$(ARTIFACTS_DIR)/nodejs" exec "yarn workspaces focus --production && yarn cache clean"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json"