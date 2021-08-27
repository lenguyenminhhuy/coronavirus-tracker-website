import 'source-map-support/register';
import {
  APIGatewayProxyEvent} from "aws-lambda";



import DynamoDB from 'aws-sdk/clients/dynamodb';
import AWS = require('aws-sdk');
import daily from '../utils/readData';

// import { BatchGetItemCommand } from "@aws-sdk/client-dynamodb";
// import { ddbClient } from "../config/ddbClient";
const client = new AWS.DynamoDB({ region: 'us-east-2' });


// // Create clients and set shared const values outside of the handler.
// import CustomSqsClient from '../utils/sqs';

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
function chunkArray(arr:DynamoDB.DocumentClient.WriteRequest[], chunkCount:number) {
  const chunks = [];
  while(arr.length) {
    // eslint-disable-next-line no-param-reassign
    const chunkSize = Math.ceil(arr.length / (chunkCount -= 1) );
    const chunk = arr.slice(0, chunkSize);
    chunks.push(chunk);
    // eslint-disable-next-line no-param-reassign
    arr = arr.slice(chunkSize);
  }
  return chunks;
}


const addRequest = async (record: DynamoDB.DocumentClient.WriteRequest[])=>{
  const params: DynamoDB.DocumentClient.BatchWriteItemInput = {
    RequestItems : { 
      'CovidTimeSeriesTable1' : record
    }
  };
  const run = async () => {
    try {
      const result =  await client.batchWriteItem(params).promise()
        .then(data => data)
        .catch(console.error);
        // console.log("Success, items retrieved");
      return result;
    } catch (err) {
      return console.log("Error", err);
    }
  };
  await run();
}

exports.handler = async (
  event: APIGatewayProxyEvent,
): Promise<void> => {

  console.log("Received event:", event);


  try {
    const dailyRecord = await daily.getData();

    const splice = chunkArray(dailyRecord, 20);

    for (let i = 0; i < splice.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await addRequest(splice[i]);
    }

    // const params: DynamoDB.DocumentClient.BatchWriteItemInput = {
    //   RequestItems : { 
    //     CovidTimeSeriesTable : splice[0]
    //   }
    // };

    // const run = async () => {
    //   try {
    //     const result =  await client.batchWriteItem(params).promise()
    //       .then(data => data)
    //       .catch(console.error);
    //     // console.log("Success, items retrieved");
    //     return result;
    //   } catch (err) {
    //     return console.log("Error", err);
    //   }
    // };
    // await run();

    

    // for (let i = 0; i < splice.length; i += 1) {
    //   // eslint-disable-next-line no-await-in-loop
    //   await addRequest(splice[i]);
    // }


  
    
    // All log statements are written to CloudWatch
    //   console.info('received:', event);
  
    //   const response = {
    //     statusCode: 201,
    //     body: JSON.stringify({ MessageId: result.MessageId })
    //   };
  
    //   // All log statements are written to CloudWatch
    //   console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    //   return response;
    // client.batchWrite(params).promise()
    //   .then(data => {
    //     console.log("Data arrived from CloudWatch")
    //     console.log(data)})
    //   .catch(console.error)
  } catch (err) {
    console.log(err);
  }

  console.log("Data has been insert to DynamoDB"); 

}

