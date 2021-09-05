import "./Analysis.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import mockData from "../mock-data.json";
import { Flex, Heading } from "@chakra-ui/react";
// Import Charts
import BarChartDailyCase from "../components/BarChartDailyCase";
import StatsBoard from "../components/StatsBoard";
import BarChartContinent from "../components/BarChartContinent";
import BarChartCompound from "../components/BarChartCompound";
import AreaChartARD from "../components/AreaChartARD";

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

function Analysis() {

  return (
    <Flex className="analysisMain" w="100%" flexDir="column">
      {/* *** HEADING *** */}
      <Flex className="analysisHeading" flexDir="row" w="100%">
        <Heading color="#000">Analysis</Heading>
      </Flex>

      {/* *** Chart grid *** */}
      <Flex className="analysisContent" flexDir="column">
        <Flex
          className="analysisRow container1"
          flexDir={["column", "column", "column", "row-reverse", "row-reverse"]}
        >
          <Flex
            className="analysisChart chart1"
            w={["100%", "100%", "100%", "40%", "40%"]}
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <StatsBoard />
          </Flex>
          <Flex
            className="analysisChart chart2"
            w={["100%", "100%", "100%", "60%", "60%"]}
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <StatsBoard />
          </Flex>
        </Flex>
        <Flex
          className="analysisRow container2"
          flexDir={["column", "column", "column", "row", "row"]}
        >
          <Flex
            className="analysisChart chart3"
            w={["100%", "100%", "100%", "50%", "50%"]}
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <StatsBoard />
            {/* <AreaChartARD data={mockData} continent="Asia" mode="total_cases" /> */}
          </Flex>
          <Flex
            className="analysisChart chart4"
            w={["100%", "100%", "100%", "50%", "50%"]}
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <BarChartCompound data={mockData} country="Vietnam" />
          </Flex>
        </Flex>
        <Flex className="analysisRow container3" flexDir="column">
          <Flex
            className="analysisChart chart5"
            w="100%"
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <BarChartCompound data={mockData} country="Thailand" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default Analysis;
