import "source-map-support";
import aws, { DynamoDB } from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// Define type for request's body
interface RequestBody {
  email: string;
}

// Put Table schema
interface EmailSubscriptionTableSchema {
  Email: string;
  CreatedAt: string;
}

const putDynamoItem = async (
  params: DynamoDB.DocumentClient.Put,
  documentClient: DynamoDB.DocumentClient
) => {
  let data = null;
  try {
    data = await documentClient.put(params).promise();
  } catch (err) {
    return err;
  }
  return data;
};

exports.handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Initialize DynamoDB's client
  const docClient = new aws.DynamoDB.DocumentClient({
    region: process.env.ENVIRONMENT_TYPE === "Dev" ? "localhost" : "us-east-2",
    endpoint:
      process.env.ENVIRONMENT_TYPE === "Dev"
        ? "http://dynamodb-local:8000"
        : "https://dynamodb.us-east-2.amazonaws.com",
    convertEmptyValues: true,
  });

  // Parse request body
  const { email }: RequestBody = JSON?.parse(event.body ?? "null");

  // Check null and empty email
  if (email === null || email.match(/^ *$/) !== null) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message:
          "ERROR! Cannot subscribe with NULL email field. Please check again!",
      }),
    };
  }

  // Put email item
  const putEmail: EmailSubscriptionTableSchema = {
    Email: email,
    CreatedAt: new Date().toISOString(),
  };

  // Prepare parameters for reading list of subscribed emails
  const docParams: DynamoDB.DocumentClient.Put = {
    TableName: "emailSubscription",
    Item: putEmail,
  };

  // Put email process
  console.log("=> Adding a new email...");
  console.log("Sending response...");

  // Put item process
  try {
    const data = await putDynamoItem(docParams, docClient);
    console.log("data:", data);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "ERROR! Cannot subscribe! Please check again!",
      }),
    };
  }

  // Success response
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${email} has subscribed for daily news successfully!`,
    }),
  };
};
