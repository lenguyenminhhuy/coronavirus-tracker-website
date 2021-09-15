.PHONY: build-RuntimeDependenciesLayer build-lambda-common
.PHONY: build-HistoryFunction build-UpdateHistoryFunction build-GetCountryListFunction build-ScarpingDataFunction \
        build-GetDailyFunction build-GetDailyAPIFunction build-SendDailyEmailFunction build-SubscribeEmailFunction build-ScarpingData10Function build-IngestDataFunction build-GetTweetsFunction \ 

build-UpdateHistoryFunction:
	$(MAKE) HANDLER=src/handlers/updateHistory.ts build-lambda-common

build-HistoryFunction:
	$(MAKE) HANDLER=src/handlers/history.ts build-lambda-common

build-GetCountryListFunction:
	$(MAKE) HANDLER=src/handlers/getCountryList.ts build-lambda-common

build-GetDailyFunction:
	$(MAKE) HANDLER=src/handlers/covidDaily.ts build-lambda-common

build-GetDailyAPIFunction:
	$(MAKE) HANDLER=src/handlers/covidDailyAPI.ts build-lambda-common

build-ScarpingDataFunction:
	$(MAKE) HANDLER=src/handlers/scraping.ts build-lambda-common

build-ScarpingData10Function:
	$(MAKE) HANDLER=src/handlers/top10.ts build-lambda-common

build-SendDailyEmailFunction:
	$(MAKE) HANDLER=src/handlers/send-daily-email.ts build-lambda-common

build-SubscribeEmailFunction:
	$(MAKE) HANDLER=src/handlers/subscribe-email.ts build-lambda-common

build-IngestDataFunction:
	$(MAKE) HANDLER=src/handlers/tweets.ts build-lambda-common

build-GetTweetsFunction:
	$(MAKE) HANDLER=src/handlers/get-tweets.ts build-lambda-common

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
