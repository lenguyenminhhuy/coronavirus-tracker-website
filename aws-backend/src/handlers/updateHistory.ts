import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from 'axios';
var AWS = require('aws-sdk');

const dynamodbTableName = 'covid-history';
const dynamodb = new AWS.DynamoDB.DocumentClient();

function computeDaysBetween(day: string) {
    return Math.floor((Date.now() - Date.parse(day)) / 86400000);
}

function sleep(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms)
    })
}
  
async function updateHistory(continent: string) {
    try {
      axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json')
      .then((res:any) => {
        for (let item in res.data) {
          if (res.data[item].continent === continent) {
            let modifyData = []
            let rawData = res.data[item].data
            for (let i = rawData.length - 1; i >= 0; i--) {
              if(computeDaysBetween(rawData[i].date) <= 120) {
                let obj = {
                  date: rawData[i].date,
                  totalCases: (!Number.isNaN(parseFloat(rawData[i].total_cases)) ? parseFloat(rawData[i].total_cases) : 0).toString(),
                  newCases: (!Number.isNaN(parseFloat(rawData[i].new_cases)) ? parseFloat(rawData[i].new_cases) : 0).toString(),
                  totalDeaths: (!Number.isNaN(parseFloat(rawData[i].total_deaths)) ? parseFloat(rawData[i].total_deaths) : 0).toString(),
                  newDeaths: (!Number.isNaN(parseFloat(rawData[i].new_deaths)) ? parseFloat(rawData[i].new_deaths) : 0).toString(),
                  totalTests: (!Number.isNaN(parseFloat(rawData[i].total_tests)) ? parseFloat(rawData[i].total_tests) : 0).toString(),
                  newTests: (!Number.isNaN(parseFloat(rawData[i].new_tests)) ? parseFloat(rawData[i].new_tests) : 0).toString(),
                  totalVaccinations: (!Number.isNaN(parseFloat(rawData[i].total_vaccinations)) ? parseFloat(rawData[i].total_vaccinations) : 0).toString(),
                  newVaccinations: (!Number.isNaN(parseFloat(rawData[i].new_vaccinations)) ? parseFloat(rawData[i].new_vaccinations) : 0).toString(),
                }
                modifyData.push(obj);
              } else {
                break;
              }
            }
            let params = {
              TableName: dynamodbTableName,
              Item: {
                data: modifyData,
                country: item,
                location: res.data[item].location?  res.data[item].location : null,
                continent: res.data[item].continent? res.data[item].continent : null
              }
            }
            dynamodb.put(params, (err: any) => {
              if (err) {
                console.error(err);
              }
            })
            sleep(2000);
          }
        }
        
      })
    } catch(error) {
      console.error('Do your custom error handling hre. I am just gonna log it: ', error);
    }
    return 
  }
exports.handler = async (
  event: APIGatewayProxyEvent & {continent: string}
): Promise<APIGatewayProxyResult> => {
  // eslint-disable-next-line no-restricted-syntax
    console.debug("Received event:", event);
    let response = "Failed";    
    if (event.continent) {
        await updateHistory(event.continent);
        response = "Updated";
        console.log(response);
        await sleep(10000);
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    }
    return {
        statusCode: 400,
        body: JSON.stringify(response)
    }
};
