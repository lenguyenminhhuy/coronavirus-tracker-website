import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";
import axios from 'axios';

function App() {
  const [information, setInformation] = useState([]);

  useEffect(() => {
    axios.get('https://api.covid19api.com/summary')
    .then((res) => {console.log('dataa',res.data.Global);
    setInformation(res.data.Global)})
  })

  const dataHighlight = useMemo(() => {
    if (information){
      // const latestData  = information[information.length - 1];
      return [
      //   {
      //     title: "Total tested cases",
      //     count: information.total_tests,
      //     type: 'tested'
      // },
        {
          title: "Total confirmed cases",
          count: information.TotalConfirmed,
          type: 'confirmed'
      },
      // {
      //     title: "Total vacinated cases",
      //     count: information.total_vaccinations,
      //     type: 'recovered'
      // },
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
    <div>
      <Highlight infor={dataHighlight}/>
      <Summary />
    </div>
  );
}

export default App;
