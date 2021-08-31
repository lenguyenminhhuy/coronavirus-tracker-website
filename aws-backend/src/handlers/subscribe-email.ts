import "source-map-support";
import aws, { DynamoDB, SES } from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { SendEmailRequest } from "aws-sdk/clients/ses";

// Define type for request's body
interface RequestBody {
  email: string;
}

// Put Table schema
interface EmailSubscriptionTableSchema {
  Email: string;
  CreatedAt: string;
}

/**
 *
 * @param params Parameters which include table's name and inserted
 * @param documentClient Document client for connection to DynamoDB table
 * @returns Return AWS's event data
 */
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

/**
 *
 * @param sender Sender of email (usually the main account of SES -> CoronaNews <coronanews@minhthings.com>)
 * @param recipient Receiver of email (recently-subscribed user)
 * @returns
 */
const sendWelcomeEmail = async (sender: string, recipient: string) => {
  // Construct SES client
  const sesClient = new SES({
    region: "us-east-2",
  });

  // Construct body of welcome message
  const bodyHtml = `<html>
  <head></head>
  <body>
    <h1>Welcome to CoronaNews!</h1>
    <p>
      You're now eligible to receive our daily news in terms of the current <b>COVID-19 Pandemic<b>! 
    </p>
    <p>News will be delivered at the early morning (GMT +7), so stay tuned and stay safe</p> 🙏
    <p>
      In the meantime, you can visit our <a href="https://google.com">website</a> to have a glance at "crucial" statistics of COVID-19! 🔍
    </p>
    <br/>
    <b>Coronavirus-Tracker-Website</b>
  </body>
  </html>`;

  // Construct confirmation email
  const mailParams: SendEmailRequest = {
    Source: sender,
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Subject: {
        Data: "[Welcome Letter] You are now subscribed to receive daily news about the COVID-19 pandemic!",
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: bodyHtml,
          Charset: "UTF-8",
        },
      },
    },
  };

  // Send welcome letter
  const data = await sesClient.sendEmail(mailParams).promise();
  return data;
};

/**
 * @param event Event object of AWS-SDK
 * @returns Promise result from API Gateway
 */
exports.handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // Initialize environment modes
  const region: string =
    process.env.ENVIRONMENT_TYPE === "Local" ? "localhost" : "us-east-2";
  const endpoint: string =
    process.env.ENVIRONMENT_TYPE === "Local"
      ? "http://dynamodb-local:8000"
      : "https://dynamodb.us-east-2.amazonaws.com";

  // Initialize DynamoDB's client
  const docClient = new aws.DynamoDB.DocumentClient({
    region,
    endpoint,
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

  console.log("=> Adding a new email to emailSubscription table...");
  // Put item process
  try {
    const data = await putDynamoItem(docParams, docClient);
    console.log("data:", data);
  } catch (err) {
    console.log(err, err.stack);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "ERROR! Cannot subscribe! Please check again!",
      }),
    };
  }

  // Send WELCOME letter
  try {
    const data = await sendWelcomeEmail(
      "CoronaNews <coronanews@minhthings.com>",
      email
    );
    console.log("data:", data);
  } catch (err) {
    console.log(err, err.stack);
    // Error response!
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Error! ${err}`,
      }),
    };
  }

  // Success response!
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${email} has subscribed for daily news successfully! Welcome letter sent!`,
    }),
  };
};
