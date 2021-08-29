import React, { useState, useEffect } from "react";

import Loading from "./Loading";
import WorldMap from "./WorldMap";
import LoadCountryData from "../tasks/LoadCountriesData";
import Legend from "./Legend";
import legendItems from "../legends/LegendItems";
import MapFilter from "./MapFilter";
import { Select } from "@chakra-ui/select";
import axios from "axios";

function Summary() {
  let modes = [
    { label: "Total cases", value: "total_cases" },
    { label: "Total deaths", value: "total_deaths" },
    { label: "Vaccinated cases", value: "people_vaccinated" },
    { label: "New cases", value: "new_cases" },
  ];
  async function selectData(data, mode) {
    let selectedArray = [];
    let dataKeys = Object.keys(data);
    console.log(dataKeys);
    dataKeys.forEach((key) => {
      let temp = {};
      temp["country"] = data[key].location;
      temp['iso_code'] = key;
      temp[mode] = data[key][mode];
      if (temp[mode] === null) {
        temp[mode] = "No data";
      }
      selectedArray.push(temp);
    });
    return selectedArray;
  }

  const [mode, setMode] = useState('total_deaths');
  const [displayedData, setDisplayData] = useState([]);

  useEffect(() => {
    selectData(data, mode).then((res) => {
      setDisplayData(res);
      console.log("res",res)
    });
  }, [mode]);
  

  console.log("Current mode: " + mode);
  console.log(displayedData);


  const [data, setData] = useState([]);
  useEffect(() => {axios.get('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json')
  .then(res => { setData(res.data) })}, []);

  const handleChange = ((e) => {
    setMode(e.target.value);
  })

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

  return (
    <div>
      {countries.length === 0 ? (
        <Loading />
      ) : (
        <div>
          {/* <MapFilter data={data} defaultMode={"total_deaths"} /> */}
          <Select
            width="95%"
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
