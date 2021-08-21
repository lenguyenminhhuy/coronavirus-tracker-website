const browserObject = require('./browser');
const scraperController = require('./pageController');


const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

let timeout = 1500000;


// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, './frontend/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', async (req,res) => {

    req.setTimeout(timeout);

    try {

        let browserInstance = browserObject.startBrowser();

        // Pass the browser instance to the scraper controller
        scraperController(browserInstance);

        //Start the browser and create a browser instance
        var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        res.json(obj);
        console.log('Sent list of items');

    } catch (err) {
        console.log('error: ', error);
        return res.status(400).send('error: ' + error.toString());
    }
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);

module.exports = app;