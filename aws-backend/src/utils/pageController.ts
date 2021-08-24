/* eslint-disable @typescript-eslint/no-explicit-any */
import fs = require('fs');
import pageScraper from './pageScraper';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function scrapeAll(browserInstance: any): Promise<void>{
  let browser;
  try{
    browser = await browserInstance;
    // await pageScraper.scraper(browser);
    // let scrapedData = {};

    // eslint-disable-next-line prefer-const
    let scrapedData = await pageScraper.scraper(browser);
    await browser.close();

    // eslint-disable-next-line consistent-return
    fs.writeFileSync("/tmp/data.json", JSON.stringify(scrapedData), 'utf8');

  }
  catch(err){
    console.log("Could not resolve the browser instance => ", err);
  }
}