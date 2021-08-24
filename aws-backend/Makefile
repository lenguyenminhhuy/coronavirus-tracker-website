.PHONY: build-RuntimeDependenciesLayer build-lambda-common
.PHONY: build-ScarpingFunction build-CovidFunction 
# .PHONY: build-BrowserAndUtilsLayer


build-CovidFunction:
	$(MAKE) HANDLER=src/handlers/hello.ts build-lambda-common

# build-BrowserAndUtilsLayer:
# 	$(MAKE) UTIL_HANDLER=src/utils/ build-lambda-common

build-ScarpingFunction:
	$(MAKE) HANDLER=src/handlers/scraping.ts build-lambda-common


build-lambda-common:
	yarn install
	rm -rf dist
	echo "{\"extends\": \"./tsconfig.json\", \"include\": [\"${HANDLER}\"] }" > tsconfig-only-handler.json
	yarn build -- --build tsconfig-only-handler.json
	cp -r dist "$(ARTIFACTS_DIR)/"

build-RuntimeDependenciesLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp package.json yarn.lock "$(ARTIFACTS_DIR)/nodejs/"
	yarn install --production --cwd "$(ARTIFACTS_DIR)/nodejs/"
	rm "$(ARTIFACTS_DIR)/nodejs/package.json"



