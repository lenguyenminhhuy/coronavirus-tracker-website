/* eslint-disable @typescript-eslint/indent */
import AWS = require('aws-sdk');
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


AWS.config.update({
  region: "us-east-2",
});

const docClient = new AWS.DynamoDB.DocumentClient();


exports.handler = async (
  event: APIGatewayProxyEvent, context: any
): Promise<APIGatewayProxyResult> =>  {
  let response;
  console.log(event);

  const params:AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: 'CovidTimeSeriesTable1'
  };
  
  // fetch all todos from the database
  // For production workloads you should design your tables and indexes so that your applications can use Query instead of Scan.
  const result  =  await docClient.scan(params).promise()
  .then(data => {
    const entries = data.Items;
    response = {
      statusCode: 200,
      body: JSON.stringify(entries?.slice(0, 223)),
    };
      return response;
    }).catch(console.error);

  // create a response
  // eslint-disable-next-line prefer-const
  

  // result?.Items[result.Items.lengthslice(-2)]

  return context.succeed(result);
};