
import puppeteer = require('puppeteer-core');
import chromium = require('chrome-aws-lambda');

async function startBrowser(){

  let browser;
  try {
    // pageScraping = true;
    console.log("Opening the browser......");
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return browser;
}

module.exports = {
  startBrowser
};