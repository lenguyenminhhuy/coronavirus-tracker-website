import axios from 'axios';
import React, { Component, useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Highlight from '../components/Highlight';
import Summary from '../components/Summary';

function WorldMap() {
  const [information, setInformation] = useState([]);

  useEffect(() => {
    axios.get('https://api.covid19api.com/summary')
    .then((res) => {console.log('dataa',res.data.Global);
    setInformation(res.data.Global)})
  });

  const dataHighlight = useMemo(() => {
    if (information){
      return [
        {
          title: "Total confirmed cases",
          count: information.TotalConfirmed,
          type: 'confirmed'
      },
      {
          title: "Total death cases",
          count: information.TotalDeaths,
          type: 'death'
      },
      ];
    }
    return []; 
  }, [information])
    return (
    <div className="App">
      <h1>Project Home</h1>
      {/* Link to List.js */}
        <button variant="raised" href="list.js">
            My List
        </button>
      <div>
        <Highlight infor={dataHighlight}/>
        <Summary />
      </div>
    </div>
    );
}
export default WorldMap;