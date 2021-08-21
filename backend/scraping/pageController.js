const pageScraper = require('./pageScraper');
const fs = require('fs');
async function scrapeAll(browserInstance){
    let browser;
    try{
        browser = await browserInstance;
        // await pageScraper.scraper(browser);
        let scrapedData = {};
        
        scrapedData = await pageScraper.scraper(browser, 'Food');
        await browser.close();
        fs.writeFile("data.json", JSON.stringify(scrapedData), 'utf8', function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The data has been scraped and saved successfully! View it at './data.json'");
        });

    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)