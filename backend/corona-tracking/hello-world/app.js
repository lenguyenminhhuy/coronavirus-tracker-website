const browserObject = require('/opt/browser.js');
const scraperController = require('/opt/pageController.js');
// const bodyParser = require('body-parser');


// const express = require('express');
const fs = require('fs');

// const app = express();

// // let timeout = 1500000;

// // app.use(bodyParser.json());

// exports.lambdaHandler = async (event, context) => {
//     let result = null;
//     let browserInstance = null;

//     try {

//         // let browserInstance = browserObject.startBrowser();

//         // // Pass the browser instance to the scraper controller
//         // scraperController(browserInstance);

//         // //Start the browser and create a browser instance
//         // var obj = JSON.parse(fs.readFileSync('/tmp/data.json', 'utf8'));
//         const response = {
//             headers: {
//               'Content-type': 'application/json'
//             },
//             statusCode: 200,
//             body: JSON.stringify("ghgh")
//           }
//         context.succeed(response)

//     } catch (error) {
//         return context.fail(error)
//     }

//     // try {
//     //     browser = await puppeteer.launch({
//     //         args: chromium.args,
//     //         defaultViewport: chromium.defaultViewport,
//     //         executablePath: await chromium.executablePath,
//     //         headless: chromium.headless,
//     //     });
//     //     let page = await browser.newPage();
        
//     //     await page.goto(event.link);

//     //     helper.someFunction();
        
//     //     result = await page.title();
//     // } catch (error) {
//     //     console.log(error);
//     //     result = error;
//     // } finally {
//     //     if (browser !== null) {
//     //         await browser.close();
//     //     }
//     // }
//     // return context.succeed(result);
// };



// // Serve the static files from the React app
// // app.use(express.static(path.join(__dirname, './frontend/build')));

// // An api endpoint that returns a short list of items

// // app.get('/api/getList', async (req,res) => {

// //     req.setTimeout(timeout);

// //     try {

// //         let browserInstance = browserObject.startBrowser();

// //         // Pass the browser instance to the scraper controller
// //         scraperController(browserInstance);

// //         //Start the browser and create a browser instance
// //         var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
// //         res.json(obj).end();
// //         console.log('Sent list of items');

// //     } catch (err) {
// //         console.log('error: ', error);
// //         return res.status(400).send('error: ' + error.toString());
// //     }
// // });

// // const port = process.env.PORT || 5000;
// // app.listen(port);

// // console.log('App is listening on port ' + port);

// module.exports = app;

const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');


exports.lambdaHandler = async (event, context) => {
    let browserInstance = null;
    let response = null;
    try {
        let browserInstance = await browserObject.startBrowser();

        // Pass the browser instance to the scraper controller
        await scraperController(browserInstance);

        // let page = await browserInstance.newPage();

        //Start the browser and create a browser instance
        var obj = await JSON.parse(fs.readFileSync('/tmp/data.json', 'utf8'));
        
        // await page.goto('https://abli.asia/covid19aggregator');
        
        // result = await page.title();
        response = {
            'statusCode': 200,
            'body': JSON.stringify(obj)
        }
    } catch (error) {
        console.log(error);
        result = error;
    } finally {
        if (browserInstance !== null) {
            await browserInstance.close();
        }
    }
    return context.succeed(response);
};
