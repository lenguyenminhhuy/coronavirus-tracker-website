import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import axios from 'axios';
var AWS = require('aws-sdk');

const dynamodbTableName = 'covidHistory_Prod';
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
            if(computeDaysBetween(rawData[i].date) <= 90) {
              let obj;
              try {
                obj = {
                  date: rawData[i].date,
                  totalCases: (!isNaN(rawData[i]['total_cases']) && rawData[i].total_cases != null) ? parseInt(rawData[i].total_cases) : 0,
                  newCases: (!isNaN(rawData[i]['new_cases']) && rawData[i].new_cases != null) ? parseInt(rawData[i].new_cases) : 0,
                  totalDeaths: (!isNaN(rawData[i]['total_deaths']) && rawData[i].total_deaths != null) ? parseInt(rawData[i].total_deaths) : 0,
                  newDeaths: (!isNaN(rawData[i]['new_deaths']) && rawData[i].new_deaths != null) ? parseInt(rawData[i].new_deaths) : 0,
                  totalTests: (!isNaN(rawData[i]['total_tests']) && rawData[i].total_tests!= null) ? parseInt(rawData[i].total_tests) : 0,
                  newTests: (!isNaN(rawData[i]['new_tests']) && rawData[i].new_tests != null) ? parseInt(rawData[i].new_tests) : 0,
                  totalVaccinations: (!isNaN(rawData[i]['total_vaccinations']) && rawData[i].total_vaccinations != null) ? parseInt(rawData[i].total_vaccinations) : 0,
                  newVaccinations: (!isNaN(rawData[i]['new_vaccinations']) && rawData[i].new_vaccinations != null) ? parseInt(rawData[i].new_vaccinations) : 0,
                }
              } catch (err) {
                console.error('error at parsing stats: ', err);
              }
              modifyData.push(obj)
            } else {
              break;
            }
          }
          if (modifyData.length != 0) {
            let params = {
              TableName: dynamodbTableName,
              Item: {
                data: modifyData.reverse(),
                country: item,
                location: res.data[item].location?  res.data[item].location : null,
                continent: res.data[item].continent? res.data[item].continent : null
              }
            }
            try {
              dynamodb.put(params, (err: any) => {
                if (err) {
                  console.error(err);
                }
              })
            } catch(err) {
              console.error('error at dynamodb put: ', err); 
            }
          }
          sleep(2000);
        }
      }
      
    })
  } catch(error) {
    console.error('error at axios: ', error);
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
        await sleep(20000);
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
