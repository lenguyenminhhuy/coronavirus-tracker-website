const puppeteer = require("puppeteer");
let pageScraping = false; /* set scraping to false */

const scraper = async () => {
  if (pageScraping == true) return; /* check if already scraping page */
  let browser, page;
  let pageUrl = 'https://www.younow.com/Ken_Nara24';

  try {
    pageScraping = true; /* set scraping to true */
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

    /* wait for chat to be visible */
    await page.waitForSelector('.chat', { visible: true, timeout: 60000 });

    let getComments = await page.evaluate(() => {
      let scrapeComments = [];
      let comments = document.querySelectorAll('.comment');

      comments.forEach(comment => {
        let commentContent = '';
        let commentAuthor = comment.querySelector('div[class="user-card__header mini-profile-launcher"]').innerText;
        commentContent = comment.querySelector('div[class="user-card__body ng-star-inserted"]').innerText;

        scrapeComments.push({
          'commentAuthor': commentAuthor,
          'commentContent': commentContent,
        });
      });

      return { 'userComments': scrapeComments };
    });

    console.log(await getComments); /* log comments */
  } catch (err) {
    console.log(err.message);
  } finally {
    if (browser) { /* check if browser is open befor trying to close */
      await browser.close();
      console.log('closing browser');
    }
    pageScraping = false; /* set scraping to false again */
    await setTimeout(scraper, 5000); /* wait 5 seconds befor re-scraping */
  }
}

setTimeout(scraper, 5000); /* start scraping */