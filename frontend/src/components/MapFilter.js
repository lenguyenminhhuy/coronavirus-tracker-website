import React, { useState, useEffect } from "react";
import { Select } from "@chakra-ui/react";

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

function MapFilter({ data, defaultMode }) {
  let modes = [
    { label: "Total cases", value: "total_cases" },
    { label: "Total deaths", value: "total_deaths" },
    { label: "Vaccinated cases", value: "people_vaccinated" },
    { label: "New cases", value: "new_cases" },
  ];
  const [mode, setMode] = useState(defaultMode);
  const [displayedData, setDisplayData] = useState([]);

  useEffect(() => {
    selectData(data, mode).then((res) => {
      setDisplayData(res);
    });
  }, [mode]);

  console.log("Current mode: " + mode);
  console.log(displayedData);

  const handleChange = (e) => {
    setMode(e.target.value);
  }
  return (
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

    // for using
    // api: https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json
    // <MapFilter data={data} defaultMode={"total_cases"} />
  );
}

export default MapFilter;
