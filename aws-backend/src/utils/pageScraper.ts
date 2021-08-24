// var jsdom = require("jsdom");
// var JSDOM = jsdom.JSDOM;

// GLOBAL.document = new JSDOM(html).window.document;

const scraperObject = {
  url: 'https://abli.asia/covid19aggregator',
  async scraper(browser: { newPage: () => any; }){
    const page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    // Navigate to the selected page
    await page.goto(this.url);
    // Wait for the required DOM to be rendered
    await page.waitForSelector('.telerik-reTable-4');
    // Get the link to all the required books
    // let urls = await page.$$eval('tbody > tr', links => {
    //     let dataObj = {};
    //     dataObj['title'] = links.map(el => el.querySelector('td  > a'));
    //     dataObj['name'] = links.querySelector('td  > a', text => text.textContent);
    //     dataObj['link'] = links.map(el => el.querySelector('td > a').href);
    //     dataObj['country'] = links.map(el => el.querySelector('td:nth-child(2)'));
    //     dataObj['author'] = links.map(el => el.querySelector('td:nth-child(4)'));

    //     return dataObj;
    // });
    // eslint-disable-next-line no-async-promise-executor
    const pagePromise = new Promise(async(resolve, reject) => {

      try {
        const urls = await page.evaluate(() => {
          const results: { title: string | null; link: string; country: string | null; author: string | null; date: string | null; }[] = [];
          const items = document.querySelectorAll('tbody > tr');
          items.forEach((item) => {
        
            results.push(
              {
                title: item.getElementsByTagName('a')[0].textContent,
                link:  item.getElementsByTagName('a')[0].href,
                country: item.getElementsByTagName("td")[1].textContent,
                author: item.getElementsByTagName("td")[3].textContent,
                date: item.getElementsByTagName("td")[0].textContent
              }
            )
          });
          return results;
        })
        return resolve(urls);
      } catch(e) {
        return reject(e);
      }

    });

    // resolve(urls);
    return pagePromise;

  }
}

module.exports = scraperObject;