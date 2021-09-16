import 'source-map-support';
import aws, { Lambda } from 'aws-sdk';
import { SendEmailRequest } from 'aws-sdk/clients/ses';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { DocumentClient, ScanOutput } from 'aws-sdk/clients/dynamodb';

interface Top10NewsResponseData {
  title: string;
  link: string;
  country: string;
  author: string;
  date: string;
}

// Declare lambda region
const lambda = new Lambda({
  region: 'us-east-2',
});

const TOP10_NEWS_LAMBDA =
  'coronavirus-tracker-website-ScarpingData10Function-GqaCuDApY68L';
/**
 *
 * @param {Lambda} handler - Lambda handler of AWS's SDK
 * @returns body - Return body of the response from top 10 news Lambda
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const invokeTop10NewsLambda = async (
  handler: Lambda
): Promise<Top10NewsResponseData[]> => {
  const params = {
    FunctionName: TOP10_NEWS_LAMBDA,
    InvocationType: 'RequestResponse',
  };
  const data = await handler.invoke(params).promise();
  const response = JSON.parse(data.Payload as string);
  // eslint-disable-next-line prefer-destructuring
  const body: Top10NewsResponseData[] = JSON.parse(response.body);
  return body;
};

/**
 * Retrieve list of subscribers managed by DynamoDB
 *
 * @returns List of emails from subscribers of CoronaNews
 */
const getListOfSubscribers = async (): Promise<string[]> => {
  // Initialize document client for DynamoDB
  const docClient = new DocumentClient({
    region: 'us-east-2',
    endpoint: 'https://dynamodb.us-east-2.amazonaws.com',
  });

  const tableName =
    process.env.ENVIRONMENT_TYPE === 'Dev'
      ? 'emailSubscription_Dev'
      : 'emailSubscription_Prod';
  // Prepare parameters
  // eslint-disable-next-line prefer-const
  let queryParams: DocumentClient.QueryInput = {
    TableName: tableName,
    ProjectionExpression: 'Email',
  };

  // Scan emailSubscription table
  console.log('=> Scanning emailSubscription table...');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listOfEmails: string[] = [];
  let data: ScanOutput;
  try {
    do {
      // eslint-disable-next-line no-await-in-loop
      data = await docClient.scan(queryParams).promise();
      data.Items?.forEach((item) => {
        listOfEmails.push(item.Email as string);
      });
      queryParams.ExclusiveStartKey = data.LastEvaluatedKey;
    } while (typeof data.LastEvaluatedKey !== 'undefined');
  } catch (err) {
    return err;
  }
  return listOfEmails;
};

const formatNewsEmail = (topNews: Top10NewsResponseData[]) => {
  const newsListContent = topNews.map(
    (news) => `
    <div>
      <a href="${news.link}"><b>${news.title}</b></a>
      <p>${news.author}</p>
      <i>${news.date} - ${news.country}</i>
    </div>

    <hr>

  `
  );

  const newListJoinedContent = newsListContent.join('');

  const bodyHtml = `<html>
  <head></head>
  <body>
    <h1>HOT/BREAKING ⚠ News Today!</h1>
    <p>
      Here are the list of news in terms of COVID-19 pandemic. Be informative and safe! 😎
    </p>
    <br />
    <div style="display:flex;justify-content:center;align-items:center>

      ${newListJoinedContent}

    </div ">
    <br />
    <b>Coronavirus-Tracker-Website - Best regards!</b>
  </body>
  </html>`;
  return bodyHtml;
};

/* Main lambda */
exports.handler = async (event: APIGatewayProxyEvent): Promise<void> => {
  // console.log("=> Print event...");
  console.log(event);
  // Initialize SES service
  const ses = new aws.SES({ region: 'us-east-2' });

  // Specify e-mail agents
  const sender = 'CoronaNews <coronanews@minhthings.com>';
  let recipients: string[];
  try {
    recipients = await getListOfSubscribers();
    console.log('Recipients:');
    console.log(recipients);
  } catch (err) {
    console.log(err, err.stack);
    console.log('=> Crashing function... due to unexpected error!!!');
    return;
  }

  // Specify Top 10 news through another API
  let topNews;
  try {
    topNews = await invokeTop10NewsLambda(lambda);
    console.log('Top News logged!');
    console.log(topNews);
  } catch (err) {
    console.log(err, err.stack);
    console.log(
      '=> Crashing Top 10 news function.. due to unexpected error!!!'
    );
    return;
  }

  // Subject line of e-mail
  const subject = '[Corona Headlines] HOT/BREAKING News Today!';

  // Content of e-mail
  const bodyHtml = formatNewsEmail(topNews);

  // charset encoding for e-mail
  const charset = 'UTF-8';

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
      console.log('=> Email sent successfully!');
      console.log(data);
    })
    .catch((err) => {
      console.log(err, err.stack);
    });
};
