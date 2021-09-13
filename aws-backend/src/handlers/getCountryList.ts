import { APIGatewayProxyEvent, APIGatewayProxyResult  } from "aws-lambda";
var AWS = require('aws-sdk');

const dynamodbTableName = 'covidHistory_Prod';
const dynamodb = new AWS.DynamoDB.DocumentClient();

type scanCountryListParams = {
  "AttributesToGet"?: [ string ],
  "ConditionalOperator"?: string,
  "ConsistentRead"?: boolean,
  "ExclusiveStartKey"?: { 
     string : { 
        "B": Blob,
        "BOOL": boolean,
        "BS": [ Blob ],
        "L": [ 
           "AttributeValue"
        ],
        "M": { 
           string : "AttributeValue"
        },
        "N": string,
        "NS": [ string ],
        "NULL": boolean,
        "S": string,
        "SS": [ string ]
     }
  },
  "ExpressionAttributeNames"?: { 
     [key: string] : string 
  },
  "ExpressionAttributeValues"?: { 
     [key: string] : { 
        "B": Blob,
        "BOOL": boolean,
        "BS": [ Blob ],
        "L": [ 
           "AttributeValue"
        ],
        "M": { 
           string : "AttributeValue"
        },
        "N": string,
        "NS": [ string ],
        "NULL": boolean,
        "S": string,
        "SS": [ string ]
     }
  },
  "FilterExpression"?: string,
  "IndexName"?: string,
  "Limit"?: number,
  "ProjectionExpression"?: string,
  "ReturnConsumedCapacity"?: string,
  "ScanFilter"?: { 
     [key: string] : { 
        "AttributeValueList": [ 
           { 
              "B": Blob,
              "BOOL": boolean,
              "BS": [ Blob ],
              "L": [ 
                 "AttributeValue"
              ],
              "M": { 
                 string : "AttributeValue"
              },
              "N": string,
              "NS": [ string ],
              "NULL": boolean,
              "S": string,
              "SS": [ string ]
           }
        ],
        "ComparisonOperator": string
     }
  },
  "Segment"?: number,
  "Select"?: string,
  "TableName": string,
  "TotalSegments"?: number
}
type CountryList = {
    country: string,
    location: string,
    continent: string
}

async function scanCountryList(params: scanCountryListParams, array: CountryList[]): Promise<CountryList[]> {

    let data = await dynamodb.scan(params).promise();
    array = array.concat(data.Items);  
    if (data.LastEvaluatedKey) {
      params.ExclusiveStartKey = data.LastEvaluatedKey;
      return await scanCountryList(params, array);
    }
    return array;
}
  
async function getCountryList() {
    const params = {
      TableName: dynamodbTableName,
      ProjectionExpression: "#country, #location, #continent",
      ExpressionAttributeNames: {
        "#country" : "country",
        "#location" : "location",
        "#continent": "continent"
      },
    }
    let array:CountryList[] = [];
    const allCountries = await scanCountryList(params, array);
    return allCountries
  }
  

exports.handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // eslint-disable-next-line no-restricted-syntax
  console.debug("Received event:", event);
  let response = await getCountryList();
  if (response) {
    return {
      statusCode: 200,
      headers: {
         "Access-Control-Allow-Headers" : "Content-Type",
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "GET"
      },
      body: JSON.stringify(response)
    }
  }
  return {
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET"
   },
    body: JSON.stringify({
      message: 'Error countered'
    })
  }
};
