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
import { Box, Center, Select, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import CustomTooltip from "./shared/CustomTooltip";
import CustomAxisX from "./shared/CustomAxisX";

async function processData(data, continent, mode) {
  let array = [];
  for (let country in data) {
    if (data[country].continent == continent && data[country][mode] != null) {
      let base = {};
      base[mode] = data[country][mode];
      base["Country"] = data[country].location;
      array.push(base);
    }
  }
  return array;
}

function BarChartContinent({ data, continent, mode }) {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    processData(data, continent, mode).then((res) => {
      setChartData(res);
    });
  }, [continent]);

  return (
    <Flex
      w="100%"
      h="100%"
      bg="#fff"
      borderRadius="15px"
      justifyContent="center"
      alignItems="center"
    >
      <ResponsiveContainer width="90%" height="90%" position="absolute">
        {/* <ResponsiveContainer width="100%" height={450}> */}
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
          <Bar dataKey={mode} name="Total Cases" fill="#8884d8" />
        </BarChart>
        {/* </ResponsiveContainer> */}
      </ResponsiveContainer>
    </Flex>
  );
}

BarChartContinent.propTypes = {
  mode: PropTypes.string,
};

export default BarChartContinent;
