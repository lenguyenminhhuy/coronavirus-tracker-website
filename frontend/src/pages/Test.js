import {
  Flex,
  Heading,
  Text,
  Icon,
  Link,
  Box,
  Divider,
  Select,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";
import BarChartDailyCase from "../components/BarChartDailyCase";
import StatsBoard from "../components/StatsBoard";
import axios from "axios";
import BarChartContinent from "../components/BarChartContinent";
import BarChartCompound from "../components/BarChartCompound";
import AreaChartARD from "../components/AreaChartARD";
import mockData from "../mock-data.json";

async function processData(data) {
  let array = [];
  for (let i = 0; i < data.length; i++) {
    let obj = {};
    obj["date"] = data[i].Date;
    obj["positive"] = data[i].Confirmed;
    array.push(obj);
  }
  return array;
}

function Test() {
  const [data, setData] = useState([]);
  const [continent, setContinent] = useState("Asia");

  useEffect(() => {
    axios.get("https://api.covid19api.com/country/south-africa").then((res) => {
      processData(res.data).then((processedData) => {
        setData(processedData);
      });
    });
  }, []);

  useEffect(() => {
    console.log(continent);
  }, [continent]);

  return (
    <Flex className="analysisMain" w="100%" flexDir="column">
      {/* *** HEADING *** */}
      <Flex className="analysisHeading" flexDir="row" w="100%">
        <Heading color="#000">Analysis</Heading>
      </Flex>

      {/* *** Chart grid *** */}
      <Flex className="analysisContent" flexDir="column" bg="pink.100">
        <Flex
          className="analysisRow container1"
          flexDir={["column", "column", "column", "row-reverse", "row-reverse"]}
          bg="pink.400"
          // h={["840px", "840px", "840px", "420px", "420px"]}
        >
          <Flex
            className="chart1"
            w={["100%", "100%", "100%", "40%", "40%"]}
            p={["5px", "5px", "5px", "10px", "15px"]}
            bg="blue.400"
          >
            <StatsBoard />
          </Flex>
          <Flex
            className="chart2"
            w={["100%", "100%", "100%", "60%", "60%"]}
            p={["5px", "5px", "5px", "10px", "15px"]}
            bg="green.400"
          >
            <StatsBoard />
          </Flex>
        </Flex>
        <Flex
          className="analysisRow container2"
          flexDir={["column", "column", "column", "row", "row"]}
          bg="pink.400"
        >
          <Flex
            className="chart3"
            w={["100%", "100%", "100%", "50%", "50%"]}
            p={["5px", "5px", "5px", "10px", "15px"]}
            bg="blue.400"
          >
            <StatsBoard />
          </Flex>
          <Flex
            className="chart4"
            w={["100%", "100%", "100%", "50%", "50%"]}
            p={["5px", "5px", "5px", "10px", "15px"]}
            bg="yellow.200"
          >
            <BarChartCompound data={data} country="Vietnam" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Test;
