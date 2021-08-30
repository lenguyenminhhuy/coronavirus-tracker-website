import axios from 'axios';
import React, { useMemo, useState, useEffect } from 'react';
import Highlight from '../components/Highlight';
import Summary from '../components/Summary';

function WorldMap() {
  const [information, setInformation] = useState([]);

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json')
    .then((res) => {setInformation(res.data.OWID_WRL)})
  }, []);

  useEffect(() => {
    axios.get('https://79dvu6wjq3.execute-api.us-east-2.amazonaws.com/Prod/api/daily')
    .then((res) => {console.log("test api",res)})
  }, []);

  const dataHighlight = useMemo(() => {
    if (information){
      return [
        {
          title: "Total confirmed cases",
          count: information.total_cases,
          type: 'confirmed'
      },
      {
          title: "Total death cases",
          count: information.total_deaths,
          type: 'death'
      },
      {
        title: "Total vaccinated cases",
        count: information.total_vaccinations,
        type: 'vaccinated'
    },
      ];
    }
    return []; 
  }, [information])

  
    return (
    <div className="App">
      <div>
        <Highlight infor={dataHighlight}/>
        <Summary />
      </div>
    </div>
    );
}
export default WorldMap;