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
import colors from "../constants/colors";
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

function BarChartContinent({ data }) {
  const modeList = [
    { label: "Total cases", key: "total_cases" },
    { label: "Total deaths", key: "total_deaths" },
    { label: "Total tests", key: "total_tests" },
    { label: "Total vaccinations", key: "total_vaccinations" },
  ];
  const [chartData, setChartData] = useState([]);
  const [continent, setContinent] = useState("Asia");
  const [mode, setMode] = useState(modeList[0]);

  const continentList = [
    "Asia",
    "Africa",
    "Europe",
    "North America",
    "South America",
    "Oceania",
  ];

  useEffect(() => {
    processData(data, continent, mode.key).then((res) => {
      setChartData(res);
    });
  }, [continent, mode, data]);

  return (
    <Flex
      w="100%"
      h="100%"
      bg="#fff"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="15px"
    >
      <Flex flexDir="row">
        <Select
          mx="5px"
          borderTop="none"
          borderRight="none"
          borderLeft="none"
          borderRadius={0}
          borderColor={colors.grayDefault}
          value={continent}
          onChange={(e) => {
            setContinent(e.target.value);
          }}
        >
          {continentList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <Select
          mx="5px"
          borderTop="none"
          borderRight="none"
          borderLeft="none"
          borderRadius={0}
          borderColor={colors.grayDefault}
          value={mode.key}
          onChange={(e) => {
            setMode(modeList[e.target.value]);
          }}
        >
          {modeList.map((item, index) => (
            <option key={index} value={index}>
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
          <XAxis minTickGap={100} dataKey="Country" tick={<CustomAxisX />} />
          <YAxis
            tickFormatter={(value) => value.toLocaleString()}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey={mode.key} name={mode.label} fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
}

BarChartContinent.propTypes = {
  mode: PropTypes.string,
};

export default BarChartContinent;
