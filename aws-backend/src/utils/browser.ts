import puppeteer = require('puppeteer-core');
import chromium = require('chrome-aws-lambda');


// eslint-disable-next-line import/prefer-default-export
// export async function startBrowser() {
//   let browser;
//   try {
//     // pageScraping = true;
//     console.log("Opening the browser......");
//     browser = await puppeteer.launch({
//       args: chromium.args,
//       defaultViewport: chromium.defaultViewport,
//       executablePath: await chromium.executablePath,
//       headless: chromium.headless,
//     });
//   } catch (err) {
//     console.log("Could not create a browser instance => : ", err);
//   }
//   return browser;
// }
export default async function startBrowser() {
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

// export default class BrowserObject {
//     async function startBrowser(){

//         let browser;
//         try {
//           // pageScraping = true;
//           console.log("Opening the browser......");
//           browser = await puppeteer.launch({
//             args: chromium.args,
//             defaultViewport: chromium.defaultViewport,
//             executablePath: await chromium.executablePath,
//             headless: chromium.headless,
//           });
//         } catch (err) {
//           console.log("Could not create a browser instance => : ", err);
//         }
//         return browser;
//       }
// }
