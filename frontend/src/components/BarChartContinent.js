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
import normalizeCamelCase from "../utils/normalizeCamelCase";

async function processData(data, continent, mode) {
  let array = [];
  for (let i in data) {
    if (data[i].continent === continent && data[i][mode] != null) {
      let base = {};
      base[mode] = data[i][mode];
      base["Country"] = data[i].location;
      array.push(base);
    }
  }
  return array;
}

function BarChartContinent({ data }) {
  const [chartData, setChartData] = useState([]);
  const [continent, setContinent] = useState("Europe");
  const [mode, setMode] = useState("totalCases");

  const continentList = [
    "Asia",
    "Africa",
    "Europe",
    "North America",
    "South America",
    "Oceania",
  ];
  const modeList = [
    { label: "Total cases", key: "totalCases" },
    { label: "Total deaths", key: "totalDeaths" },
    { label: "Total tests", key: "totalTests" },
    { label: "Total vaccinations", key: "totalVaccine" },
  ];

  useEffect(() => {
    processData(data, continent, mode).then((res) => {
      setChartData(res);
    });
  }, [data, continent, mode]);

  return (
    <Flex
      w="100%"
      h="100%"
      bg="#fff"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="15px"
      // boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
    >
      <Flex flexDir="row">
        <Select
          border="none"
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
          <XAxis minTickGap={100} dataKey="Country" tick={<CustomAxisX />} />
          <YAxis
            tickFormatter={(value) => value.toLocaleString()}
            interval={0}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey={mode} name={mode}  name={normalizeCamelCase(mode)} fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
}

BarChartContinent.propTypes = {
  mode: PropTypes.string,
};

export default BarChartContinent;
