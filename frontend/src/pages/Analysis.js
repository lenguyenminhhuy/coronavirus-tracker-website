import {
  Flex,
  Heading,
  Text,
  Icon,
  Link,
  Box,
  Divider,
  Select,
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

function Analysis() {
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
    <Flex w="100%" flexDir="column">
      {/* HEADING */}
      <Flex flexDir="row" w="100%">
        <Heading color="#000">Analysis</Heading>
      </Flex>

      {/* GRID DASHBOARD */}
      <Flex flexDir="column">
        <Flex
          flexDir={["column", "column", "column", "row-reverse", "row-reverse"]}
          // flexWrap="wrap"
          w="100%"
          h={["840px", "840px", "840px", "420px", "420px"]}
        >
          <Flex
            w={["100%", "100%", "100%", "40%", "40%"]}
            h="100%"
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <Box w="100%" h="100%" bg="#fff" borderRadius="15px">
              {/* 1 */}
              {/* <ResponsiveContainer width="100%" height="100%"> */}
              <StatsBoard />
              {/* </ResponsiveContainer> */}
            </Box>
          </Flex>
          <Flex
            w={["100%", "100%", "100%", "60%", "60%"]}
            h="100%"
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <Box w="100%" h="100%" bg="#fff" borderRadius="15px">
              {/* 2 */}
              {/* <BarChartDailyCase
                // width="100%"
                // height="100%"
                data={mockData}
              /> */}
            </Box>
          </Flex>
        </Flex>
        <Flex
          flexDir={["column", "column", "column", "row", "row"]}
          w="100%"
          h={["840px", "840px", "840px", "420px", "420px"]}
        >
          <Flex
            w={["100%", "100%", "100%", "100%", "50%"]}
            h="100%"
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <Box w="100%" h="100%" bg="#fff" borderRadius="15px">
              {/* 3 */}
              {/* <BarChartContinent /> */}
            </Box>
          </Flex>
          <Flex
            w={["100%", "100%", "100%", "100%", "50%"]}
            h="100%"
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <Box w="100%" h="100%" bg="#fff" borderRadius="15px">
              {/* 4 */}
              {/* <AreaChartARD /> */}
            </Box>
          </Flex>
        </Flex>
        <Flex flexDir="column" w="100%" h="420px">
          <Flex w="100%" h="100%" p={["5px", "5px", "5px", "10px", "15px"]}>
            <Box w="100%" h="100%" bg="#fff" borderRadius="15px">
              {/* 5 */}
              {/* <BarChartCompound data={mockData} country="Vietnam" /> */}
            </Box>
          </Flex>
        </Flex>
      </Flex>
      {/* <BarChartDailyCase /> */}
      {/* <StatsBoard /> */}
      {/* <BarChartContinent /> */}
      {/* <BarChartCompound /> */}
      {/* <AreaChartARD /> */}
    </Flex>
    // <div>
    //     <Box margin="0 auto" maxW='50%' boxShadow="0px 4px 10px rgba(0,0,0,0.1)">
    //         <StatsBoard/>
    //     </Box>
    //     {data?
    //     <Box>
    //         <BarChartDailyCase data={data}/>
    //     </Box>
    //             :
    //         null
    //     }
    //     <Box>
    //         <Select onChange={(value) => setContinent(value.target.value)}>
    //             <option value="Asia">Asia</option>
    //             <option value="Africa">Africa</option>
    //             <option value="Europe">Europe</option>
    //             <option value="South America">South America</option>
    //             <option value="North America">North America</option>
    //         </Select>
    //         <BarChartContinent data={mockData} continent={continent} mode="total_cases" />
    //     </Box>
    // </div>
  );
}

export default Analysis;
