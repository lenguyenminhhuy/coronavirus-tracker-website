/* eslint-disable camelcase */
import "source-map-support";
import { APIGatewayProxyEvent} from "aws-lambda";
import { ETwitterStreamEvent, TwitterApi } from 'twitter-api-v2';

// aws.config.loadFromPath("../../config.json");
import AWS = require("aws-sdk");
// import Twitter = require('twitter');


const client = new AWS.Firehose({ region: "us-east-2" });
const access_token = "1406998637968707587-rB8uNaxeHV8YoyL9jlaNim4CQadvgg";
const access_token_secret = "Ya2e6v4RmIdWiXrWS5zfIlWh3F8g3C7s0mKN3ZYOpQCgN";
const consumer_key = "QhlgDDE3BPFMu0Je3yiOsj1dx";
const consumer_secret = "ZvMoa7emEzvGp1rdg1NDAdm2fM592MGKGfzvbPY5YGQp58O5MX";



const userClient = new TwitterApi({
  appKey: consumer_key,
  appSecret: consumer_secret,
  accessToken: access_token,
  accessSecret: access_token_secret,
});

// const location1 = {lng: "-73.935242", lat: "40.730610"};
exports.handler = async (event: APIGatewayProxyEvent): Promise<void> => {
  console.log("Received event:", event);
  const streamFilter = await userClient.v1.filterStream({
    // See FilterStreamParams interface.
    track: 'covid',
  });

  // eslint-disable-next-line no-restricted-syntax
  await streamFilter.on(
    // Emitted when a Twitter payload (a tweet or not, given the endpoint).
    ETwitterStreamEvent.Data,
    async eventData =>{
      console.log(eventData.text);
      const params = {
        DeliveryStreamName: 'DeliveryStream', /* required */
        Record: { /* required */
          Data: JSON.stringify(eventData.text) /* Strings will be Base-64 encoded on your behalf */ /* required */
        }
      };
      await client.putRecord(params, (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
    }
  );
  
};
