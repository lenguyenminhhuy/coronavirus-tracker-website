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
    TableName: 'CovidTimeSeriesTable'
  };
  
  // fetch all todos from the database
  // For production workloads you should design your tables and indexes so that your applications can use Query instead of Scan.
  const result  =  await docClient.scan(params).promise().then(data => data).catch(console.error);

  // create a response
  // eslint-disable-next-line prefer-const
  response = {
    statusCode: 200,
    body: JSON.stringify(result?.Items),
  };

  return context.succeed(response);
};