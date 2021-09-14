import { useState, useEffect } from "react";
import {
  BarChart,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Flex, Heading, Select } from "@chakra-ui/react";
import axios from "axios";
import axiosCovid from "../config/axiosCovid";
import colors from "../constants/colors";

async function processData(data, country) {
  let array = [];
  for (let item in data) {
    if (data[item].location === country) {
      let base = {};
      base["total_cases"] = data[item]["total_cases"];
      base["total_deaths"] = data[item]["total_deaths"];
      base["total_vaccinations"] = data[item]["total_vaccinations"];
      base["total_tests"] = data[item]["total_tests"];
      base["Country"] = data[item].location;
      array.push(base);
    }
  }
  return array;
}

function sortByAlphabet(array, key) {
  return array.sort((a, b) => {
    let x = a[key];
    let y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

function BarChartCompound({ data, country = "Vietnam" }) {
  const [chartData, setChartData] = useState("");
  const [countryName, setCountryName] = useState(country);
  const [countryList, setCountryList] = useState("");

  useEffect(() => {
    processData(data, countryName).then((res) => {
      setChartData(res);
    });
    axiosCovid
      .get(
        "/api/countries",
      )
      .then((res) => {
        setCountryList(sortByAlphabet(res.data, "location"));
      });
  }, [countryName, data]);

  return (
    <Flex
      w="100%"
      h="100%"
      bg="#fff"
      flexDir="column"
      borderRadius="15px"
      justifyContent="center"
      alignItems="center"
      // boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
    >
      <Flex flexDir="row">
        <Select
          border="none"
          value={countryName}
          onChange={(e) => {
            setCountryName(e.target.value);
          }}
        >
          {countryList
            ? countryList.map((item, index) => (
                <option key={index} value={item.location}>
                  {item.location}
                </option>
              ))
            : null}
        </Select>
      </Flex>
      <ResponsiveContainer width="90%" height="90%" position="absolute">
        <BarChart data={chartData} layout="vertical" barCategoryGap={"0%"}>
          <XAxis type="number" />
          <YAxis hide={true} dataKey="Country" type="category" interval={0} />
          <Tooltip />
          <Legend />
          <Bar
            barSize={40}
            dataKey="total_cases"
            name="Total Cases"
            fill={colors.yellowDefault}
          />
          <Bar
            barSize={40}
            dataKey="total_deaths"
            name="Total Deaths"
            fill={colors.redDefault}
          />
          <Bar
            barSize={40}
            dataKey="total_vaccinations"
            name="Total Vaccinations"
            fill={colors.oceanBlueDefault}
          />
          <Bar
            barSize={40}
            dataKey="total_tests"
            name="Total Tests"
            fill={colors.grayDarkest}
          />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
}

export default BarChartCompound;