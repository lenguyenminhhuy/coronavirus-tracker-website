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
import { Select, Flex, Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";
import CustomTooltip from "./shared/CustomTooltip";
import CustomAxisX from "./shared/CustomAxisX";

async function processData(data, continent, mode) {
  let array = [];
  for (let country in data) {
    if (data[country].continent === continent && data[country][mode] != null) {
      let base = {};
      base[mode] = data[country][mode];
      base["Country"] = data[country].location;
      array.push(base);
    }
  }
  return array;
}

function BarChartContinent({
  data,
  defaultContinent = "Asia",
  defaultMode = "total_cases",
}) {
  const [chartData, setChartData] = useState();
  const [continent, setContinent] = useState(defaultContinent);
  const [mode, setMode] = useState(defaultMode);
  let dataKeys = Object.keys(data);
  const continentList = [
    "Asia",
    "Africa",
    "Europe",
    "North America",
    "South America",
    "Oceania",
  ];
  const modeList = [
    { label: "Total cases", key: "total_cases" },
    { label: "Total deaths", key: "total_deaths" },
    { label: "Total tests", key: "total_tests" },
    { label: "Total vaccinations", key: "total_vaccinations" },
  ];

  useEffect(() => {
    processData(data, continent, mode).then((res) => {
      setChartData(res);
    });
  }, [continent, mode]);

  console.log(chartData);
  return (
    <Flex
      w="100%"
      h="100%"
      bg="#fff"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="15px"
      style={{ "box-shadow": "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
    >
      <Flex flexDir="row">
        <Heading fontSize="xl" alignSelf="center">
          Continent
        </Heading>
        <Select
          border="none"
          value={continent}
          onChange={(e) => {
            setContinent(e.target.value);
          }}
        >
          {continentList.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </Select>
        <Select
          border="none"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
          }}
        >
          {modeList.map((item, index) => (
            <option key={index} value={item.key}>
              {item.label}
            </option>
          ))}
        </Select>
      </Flex>
      <ResponsiveContainer width="90%" height="90%">
        <BarChart
          width={730}
          height={250}
          data={chartData}
          barCategoryGap={"0%"}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis minTickGap={-100} dataKey="Country" tick={<CustomAxisX />} />
          <YAxis
            tickFormatter={(value) => value.toLocaleString()}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey={mode} name={mode} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
}

BarChartContinent.propTypes = {
  mode: PropTypes.string,
};

export default BarChartContinent;
