/* eslint-disable prefer-template */
/* eslint-disable arrow-body-style */
import zlib, { InputType } from 'zlib';
import { APIGatewayProxyResult } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { KINESIS_BUCKET_NAME } from '../utils/config';

// Declare S3 client for specified Region
const s3 = new S3({
  region: 'us-east-2',
});

const padPrefix = (num: number) => {
  const twoDigitPad = '0';
  let numStr = num.toString();
  if (num < 10) {
    numStr = `${twoDigitPad}${numStr}`;
  }
  return numStr;
};

// Retrieve items by prefix
const getItemKeysByPrefix = async (
  handler: S3,
  prefix: string
): Promise<string[]> => {
  // Prepare params for getting list of S3 objects
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = {
    Bucket: KINESIS_BUCKET_NAME,
    Prefix: prefix,
    StartAfter: prefix,
  };

  // Retrieve list of keys
  let data;
  try {
    data = await handler.listObjectsV2(params).promise();
  } catch (err) {
    console.log(err, err.stack);
  }
  const listOfKeys: string[] = [];

  // Appending keys to return result
  data?.Contents?.forEach((obj) => {
    if (typeof obj.Key !== 'undefined') {
      listOfKeys.push(obj.Key);
    }
  });

  // If it's truncated (usually over 1000 items in bucket)
  if (data?.IsTruncated) {
    params.ContinuationToken = data.NextContinuationToken;
    console.log('get further list...');
    getItemKeysByPrefix(handler, prefix);
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return listOfKeys;
};

// Unzip s3 (.gz) file using Zlib
const readZipBucketObject = async (
  handler: S3,
  key: string
): Promise<string> => {
  const params = {
    Bucket: KINESIS_BUCKET_NAME,
    Key: key,
  };

  // let data;
  const data = await handler.getObject(params).promise();

  // /* Data is base64-encoded, so decode here */
  // const compressedData = Buffer.from(data.Body, 'base64');

  // Unzip data
  const unzipData = zlib.gunzipSync(data?.Body as InputType);

  return unzipData.toString('utf-8');
};

/**
 *
 * @param handler - S3 Handler
 * @param datetime - Datetime for query
 * @returns - List of tweets in JSON
 */
const getTweetsByDatetime = async (
  handler: S3,
  datetime: Date
): Promise<string[]> => {
  // Parse datetime to string for S3 prefix
  const year: string = datetime.getFullYear().toString();
  const month: string = padPrefix(datetime.getMonth());
  const date: string = padPrefix(datetime.getDate());
  const hour: string = padPrefix(datetime.getHours());

  // year -> month -> day -> hour
  let kinesisPrefix: string = ['firehose', year, month, date, hour].join('/');
  kinesisPrefix = `${kinesisPrefix}/`;

  let listOfKeys: string[] = [];
  try {
    listOfKeys = await getItemKeysByPrefix(handler, kinesisPrefix);
  } catch (error) {
    console.log(error);
  }

  // Accumulate tweets
  const tweets: string[] = [];
  for await (const key of listOfKeys) {
    const tweetContent = (await readZipBucketObject(
      handler,
      key
    )) as unknown as string;
    const myRegexp = /"([^"]*)"/g;
    let match;
    do {
      match = myRegexp.exec(tweetContent);
      if (match != null) {
        tweets.push(match[1] ? match[1] : match[0]);
      }
    } while (match != null);
    // tweets.push(tweetContent);
  }
  return tweets;
};

/* Main Lambda Handler */
exports.handler = async (): // event: APIGatewayProxyEvent
Promise<APIGatewayProxyResult> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const { size, limit } = event.queryStringParameters as any;
  const testDate = new Date();
  testDate.setFullYear(2021);
  testDate.setMonth(9);
  testDate.setDate(10);
  testDate.setHours(21);
  let tweets: string[] = [];
  try {
    tweets = await getTweetsByDatetime(s3, testDate);
  } catch (err) {
    console.log(err);

    // ERROR Response
    return {
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
      statusCode: 400,
      body: JSON.stringify({
        message: `ERROR! ${err}`,
        tweets,
      }),
    };
  }

  // Successful response
  return {
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
    statusCode: 200,
    body: JSON.stringify({
      message: `Query list of tweets in 10/09/2021 21:00:00 - 21:59:59 successfully!`,
      tweets,
    }),
  };
};
