import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
var AWS = require('aws-sdk');

const dynamodbTableName = 'covidHistory_Prod';
const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getHistoryData(country: string) {
    const params = {
            TableName: dynamodbTableName,
            KeyConditionExpression: 'country = :country',
            ExpressionAttributeValues: {
                ':country': country
            }
        }
        return await dynamodb.query(params).promise().then((response: any) => {    
        return response.Items[0]
        }, (error: any) => {
        console.error(error); 
        })
}

exports.handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // eslint-disable-next-line no-restricted-syntax
  console.debug("Received event:", event);
  let data = null;
  if (event.queryStringParameters) {
    data = await getHistoryData(String(event.queryStringParameters.country));
  }
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET"
   },
    body: JSON.stringify(data),
  };
};
