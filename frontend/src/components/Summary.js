import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import WorldMap from "./WorldMap";
import LoadCountryData from "../tasks/LoadCountriesData";
import Legend from "./Legend";
import legendItems from "../legends/LegendItems";
import { Select } from "@chakra-ui/select";

function Summary() {
  let modes = [
    { label: "Total confirmed cases", value: "total_cases" },
    { label: "Total deaths", value: "total_deaths" },
    { label: "Vaccinated cases", value: "people_vaccinated" },
    { label: "Total tested case", value: "total_tests" },
  ];

  const [mode, setMode] = useState('total_cases');

  const handleChange = ((e) => {
    setMode(e.target.value);
  })

  const legendItemsReverse = [...legendItems].reverse();

  const [countries, setCountries] = useState([]);

  const load = () => {
    const loadCountriesData= new LoadCountryData();
    console.log(loadCountriesData)
    loadCountriesData.load(setCountries);
  };
  useEffect(() => {
    load();
    }, []);


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
          <Legend legendItems={legendItemsReverse} />
        </div>
      )}
    </div>
  );
};

export default Summary;
