/* eslint-disable no-var */
import browserObject = require('/opt/browser.js');
import scraperController = require('/opt/pageController.js');
// const bodyParser = require('body-parser');


// const express = require('express');
import fs = require('fs');


exports.lambdaHandler = async (event: any, context: { succeed: (arg0: any) => any; }) => {
  let browserInstance = null;
  let response = null;
  try {
    browserInstance = await browserObject.startBrowser();

    // Pass the browser instance to the scraper controller
    await scraperController(browserInstance);

    // let page = await browserInstance.newPage();

    // Start the browser and create a browser instance
    // eslint-disable-next-line vars-on-top
    var obj = await JSON.parse(fs.readFileSync('/tmp/data.json', 'utf8'));

    // await page.goto('https://abli.asia/covid19aggregator');

    // result = await page.title();
    response = {
      'statusCode': 200,
      'body': JSON.stringify(obj)
    }
  } catch (error) {
    console.log(error);
    response = error;
  } finally {
    if (browserInstance !== null) {
      await browserInstance.close();
    }
  }
  return context.succeed(response);
};
