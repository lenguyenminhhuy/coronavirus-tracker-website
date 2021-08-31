import "source-map-support";
import aws from "aws-sdk";
import { SendEmailRequest } from "aws-sdk/clients/ses";
import { APIGatewayProxyEvent } from "aws-lambda";
import { DocumentClient, ScanOutput } from "aws-sdk/clients/dynamodb";

/**
 *
 * @returns List of emails from subscribers of CoronaNews
 */
const getListOfSubscribers = async (): Promise<string[]> => {
  // Initialize document client for DynamoDB
  const docClient = new DocumentClient({
    region: "us-east-2",
    endpoint: "https://dynamodb.us-east-2.amazonaws.com",
  });

  const tableName =
    process.env.ENVIRONMENT_TYPE === "Dev"
      ? "emailSubscription_Dev"
      : "emailSubscription_Prod";
  // Prepare parameters
  const queryParams: DocumentClient.QueryInput = {
    TableName: tableName,
    ProjectionExpression: "email",
  };

  // Scan emailSubscription table
  console.log("=> Scanning emailSubscription table...");
  const listOfEmails: string[] = [];
  let data: ScanOutput;
  try {
    data = await docClient.scan(queryParams).promise();
    data.Items?.forEach((item) => {
      if (typeof item.email.S !== "undefined" || item.email.S !== null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        listOfEmails.push(item.email.S!);
      }
    });
  } catch (err) {
    return err;
  }
  return listOfEmails;
};

exports.handler = async (event: APIGatewayProxyEvent): Promise<void> => {
  // console.log("=> Print event...");
  console.log(event);
  // Initialize SES service
  const ses = new aws.SES({ region: "us-east-2" });

  // Specify e-mail agents
  const sender = "CoronaNews <coronanews@minhthings.com>";
  let recipients: string[];
  try {
    recipients = await getListOfSubscribers();
  } catch (err) {
    console.log(err, err.stack);
    console.log("=> Crashing function... due to unexpected error!!!");
    return;
  }

  // Subject line of e-mail
  const subject = "[Corona Headlines] HOT/BREAKING News Today!";

  // Content of e-mail
  const bodyHtml = `<html>
  <head></head>
  <body>
    <h1>HOT/BREAKING ⚠ News Today!</h1>
    <p>
      Enjoy the news! 😎
    </p>
    <br/>
    <b>Coronavirus-Tracker-Website</b>
  </body>
  </html>`;

  // charset encoding for e-mail
  const charset = "UTF-8";

  // Specify parameters to pass to the API
  const mailParams: SendEmailRequest = {
    Source: sender,
    Destination: {
      ToAddresses: recipients,
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: charset,
      },
      Body: {
        Html: {
          Data: bodyHtml,
          Charset: charset,
        },
      },
    },
  };

  // Send Email operation
  const sendPromise = ses.sendEmail(mailParams).promise();

  // Handle promisify function in Promise style!
  sendPromise
    .then((data) => {
      console.log("=> Email sent successfully!");
      console.log(data);
    })
    .catch((err) => {
      console.log(err, err.stack);
    });
};
