import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import WorldMap from "./WorldMap";
import LoadCountryData from "../tasks/LoadCountriesData";
import Legend from "./Legend";
import LegendCase from "../legends/LegendCase";
import LegendDeath from "../legends/LegendDeath";
import LegendVax from "../legends/LegendVax";
import LegendTest from "../legends/LegendTest";
import { Select } from "@chakra-ui/select";

function Summary() {
  let modes = [
    { label: "Total confirmed cases", value: "total_cases" },
    { label: "Total death cases", value: "total_deaths" },
    { label: "Total vaccinated cases", value: "people_vaccinated" },
    { label: "Total tested cases", value: "total_tests" },
  ];

  const [mode, setMode] = useState('total_cases');

  const handleChange = ((e) => {
    setMode(e.target.value);
  })

  const legendCaseReverse = [...LegendCase].reverse();
  const legendTestReverse = [...LegendTest].reverse();
  const legendDeathReverse = [...LegendDeath].reverse();
  const legendVaxReverse = [...LegendVax].reverse();

  const [countries, setCountries] = useState([]);

  const load = () => {
    const loadCountriesData= new LoadCountryData();
    console.log(loadCountriesData)
    loadCountriesData.load(setCountries);
  };
  useEffect(() => {
    load();
    }, []);
    const switchCase = (mode) => {
      switch(mode) {
        case 'total_cases':
          return legendCaseReverse;
        case 'total_deaths':
          return legendDeathReverse;
        case 'people_vaccinated':
          return legendVaxReverse;
        case 'total_tests':
          return legendTestReverse;
      }
    };

  return (
    <div>
      {countries.length === 0 ? (
        <Loading />
      ) : (
        <div>
          {/* <MapFilter data={data} defaultMode={"total_deaths"} /> */}
          <Select
            width="100%"
            marginBottom="5px"
            value={mode}
            onChange={handleChange}
          >
              <option value={modes[0].value}>{modes[0].label}</option>
              <option value={modes[1].value}>{modes[1].label}</option>
              <option value={modes[2].value}>{modes[2].label}</option>
              <option value={modes[3].value}>{modes[3].label}</option>
          </Select>
          <WorldMap countries={countries} options={mode}/>
          <br></br>
          <Legend legendItems={switchCase(mode)} />
        </div>
      )}
    </div>
  );
};

export default Summary;
