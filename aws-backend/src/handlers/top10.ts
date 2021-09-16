import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import fs from 'fs';
import startBrowser from '../utils/browser';
import scraperController from '../utils/pageController';

// const bodyParser = require('body-parser');
// eslint-disable-next-line import/first
// import fs from "fs";
// import * as browserObject from "../utils/browser";
// import scraperController from '../utils/pageController';

exports.handler = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event: APIGatewayProxyEvent,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any
): Promise<APIGatewayProxyResult> => {
  // eslint-disable-next-line no-restricted-syntax
  console.debug('Received event:', event);
  let browserInstance = null;
  let response = null;
  try {
    browserInstance = await startBrowser();

    // Pass the browser instance to the scraper controller
    await scraperController(browserInstance);

    // let page = await browserInstance.newPage();

    // Start the browser and create a browser instance
    // eslint-disable-next-line vars-on-top
    const obj: JSON[] = await JSON.parse(
      fs.readFileSync('/tmp/data.json', 'utf8')
    );

    // await page.goto('https://abli.asia/covid19aggregator');

    // result = await page.title();
    response = {
      statusCode: 200,
      body: JSON.stringify(obj.splice(0, 10)),
    };
  } catch (error) {
    console.log(error);
    response = error;
  } finally {
    if (browserInstance !== null && browserInstance !== undefined) {
      await browserInstance.close();
    }
  }
  return context.succeed(response);
};
