// Load the AWS SDK for Node.js
import AWS = require('aws-sdk');
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// Set the region 
AWS.config.update({region: 'us-east-2'});

// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({ region: 'us-east-2' });
export default ddbClient;