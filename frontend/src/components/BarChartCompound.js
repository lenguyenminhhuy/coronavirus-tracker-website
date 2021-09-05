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

function BarChartCompound({ data, country }) {
  const [chartData, setChartData] = useState();
  const [countryName, setCountryName] = useState(country);
  let dataKeys = Object.keys(data);

  useEffect(() => {
    processData(data, countryName).then((res) => {
      setChartData(res);
    });
  }, [countryName]);

  return (
    <Flex
      w="100%"
      h="100%"
      bg="#fff"
      flexDir="column"
      borderRadius="15px"
      justifyContent="center"
      alignItems="center"
      style={{ "box-shadow": "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
    >
      <Flex flexDir="row">
        <Heading fontSize="xl" alignSelf="center">
          Compound
        </Heading>
        <Select
          border="none"
          value={countryName}
          onChange={(e) => {
            setCountryName(e.target.value);
          }}
        >
          {dataKeys.map((key, index) => (
            <option value={data[key].location}>{data[key].location}</option>
          ))}
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
            fill="#52006A"
          />
          <Bar
            barSize={40}
            dataKey="total_deaths"
            name="Total Deaths"
            fill="#CD113B"
          />
          <Bar
            barSize={40}
            dataKey="total_vaccinations"
            name="Total Vaccinations"
            fill="#FF7600"
          />
          <Bar
            barSize={40}
            dataKey="total_tests"
            name="Total Tests"
            fill="#FFA900"
          />
        </BarChart>
      </ResponsiveContainer>
    </Flex>
  );
}

export default BarChartCompound;