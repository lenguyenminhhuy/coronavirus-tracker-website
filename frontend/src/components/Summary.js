import React, { useState, useEffect } from "react";

import Loading from "./Loading";
import WorldMap from "./WorldMap";
import LoadCountriesTask from "../tasks/LoadCountriesData";
import Legend from "./Legend";
import legendItems from "../legends/LegendItems";

const Summary = () => {
  const [countries, setCountries] = useState([]);

  const legendItemsReverse = [...legendItems].reverse();

  const load = () => {
    console.log("load");
    const loadCountriesTask = new LoadCountriesTask();
    loadCountriesTask.load((countries) => setCountries(countries));
  };

  useEffect(load, []);

  return (
    <div>
      {countries.length === 0 ? (
        <Loading />
      ) : (
        <div>
          <WorldMap countries={countries} />
          <Legend legendItems={legendItemsReverse} />
        </div>
      )}
    </div>
  );
};

export default Summary;
