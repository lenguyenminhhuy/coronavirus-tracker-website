import React, { useState, useEffect } from "react";

import Loading from "./Loading";
import WorldMap from "./WorldMap";
import LoadCountryData from "../tasks/LoadCountriesData";
import Legend from "./Legend";
import legendItems from "../legends/LegendItems";
import MapFilter from "./MapFilter";
import axios from "axios";

function Summary() {

  const [data, setData] = useState([]);

  const legendItemsReverse = [...legendItems].reverse();

  const [countries, setCountries] = useState([]);

  const load = () => {
    console.log("load");
    const loadCountriesData= new LoadCountryData();
    loadCountriesData.load(setCountries);
  };
  useEffect(() => {
    load();
    }, []);

  useEffect(() => {axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json')
  .then(res => { setData(res.data) })}, []);

  return (
    <div>
      {countries.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <MapFilter data={data} defaultMode={'total_deaths'}/>
          <WorldMap countries={countries} />
          <br></br>
          <Legend legendItems={legendItemsReverse} />
        </div>
      )}
    </div>
  );
};

export default Summary;
