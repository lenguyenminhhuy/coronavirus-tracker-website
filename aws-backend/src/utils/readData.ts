/* eslint-disable @typescript-eslint/indent */
/* eslint-disable camelcase */
import DynamoDB from 'aws-sdk/clients/dynamodb';
import fetch from 'node-fetch';

const result = {
  url: "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json",
  async getData(): Promise<DynamoDB.DocumentClient.WriteRequest[]> {
    console.log(`Checkout this JSON! from ${this.url}`);
    const table: DynamoDB.DocumentClient.WriteRequest[] = [];

    const request = await fetch(this.url)
      .then((response) => 

       response.json())
    .then(data => (data)).then( data => {
      // eslint-disable-next-line camelcase
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).forEach((entry) => {
        const [key, _value] = entry;
        const Items = {
          'PutRequest': {
            'Item': {
              'iso_code': {
                "S": key
              },
              'updated_date': {
                "S": `${data[key].last_updated_date}`
              },
              'location': {
                "S": `${data[key].location}`
              },
              'totalCases': {
                "N": (!Number.isNaN(parseFloat(data[key].total_cases)) ? parseFloat(data[key].total_cases) : 0).toString()
              },
              'totalDeaths': {
                "N": (!Number.isNaN(parseFloat(data[key].total_deaths)) ? parseFloat(data[key].total_deaths) : 0).toString()
              },
              'totalVaccine': {
                "N": (!Number.isNaN(parseFloat(data[key].total_vaccinations)) ? parseFloat(data[key].total_vaccinations) : 0).toString()
              },
              'totalTests': {
                "N": (!Number.isNaN(parseFloat(data[key].total_tests)) ? parseFloat(data[key].total_tests) : 0).toString()
              },
              'totalRecovery': {
                "N": (!Number.isNaN(parseFloat(data[key].total_tests)) ? parseFloat(data[key].total_tests) : 0).toString()
              },
              'newCases': {
                "N": (!Number.isNaN(parseFloat(data[key].new_cases)) ? parseFloat(data[key].new_cases) : 0).toString()
              },
              'newDeaths': {
                "N": (!Number.isNaN(parseFloat(data[key].new_deaths)) ? parseFloat(data[key].new_deaths) : 0).toString()
              },
              'newVaccine': {
                "N": (!Number.isNaN(parseFloat(data[key].new_vaccinations)) ? parseFloat(data[key].new_vaccinations) : 0).toString()
              },
              'newTests': {
                "N": (!Number.isNaN(parseFloat(data[key].new_tests)) ? parseFloat(data[key].new_tests) : 0).toString()
              },
              'newRecovery': {
                "N": (!Number.isNaN(parseFloat(data[key].total_cases)) ? parseFloat(data[key].total_cases) : 0).toString()
              },
            }
          }
        };
        console.log(Items);
        table.push(Items as  DynamoDB.DocumentClient.WriteRequest);
      }

      )
      return table;
    }
    ).then (data => data as DynamoDB.DocumentClient.WriteRequest[]);

    // console.log(request);

    return request;
  }
}

//   return JSON.stringify(response);


export default result;

// function chunkArray(arr:DynamoDB.DocumentClient.WriteRequest[], chunkCount:number) {
//     const chunks = [];
//     while(arr.length) {
//       // eslint-disable-next-line no-param-reassign
//       const chunkSize = Math.ceil(arr.length / (chunkCount -= 1) );
//       const chunk = arr.slice(0, chunkSize);
//       chunks.push(chunk);
//       // eslint-disable-next-line no-param-reassign
//       arr = arr.slice(chunkSize);
//     }
//     return chunks;
//   }

async function getData(){
    const response = await result.getData();
    return response;
}

getData();