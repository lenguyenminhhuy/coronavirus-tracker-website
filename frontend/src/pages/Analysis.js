import {
  Flex,
  Heading,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BarChartDailyCase from "../components/BarChartDailyCase";
import StatsBoard from "../components/StatsBoard";

function Analysis() {

  return (
    <Flex
      w="100%"
      flexDir="column"
      // overflow="auto"
      // minH="100vh"
      // bg="#999"
      // justifyContent="space-between"
    >
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
          // h={["110vh", "110vh", "100vh", "50vh", "50vh"]}
          h="420px"
        >
          <Flex
            w={["100%", "100%", "100%", "100%", "40%"]}
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
            w={["100%", "100%", "100%", "100%", "60%"]}
            h="100%"
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <Box
              w="100%"
              h="100%"
              // bg="red"
              bg="#fff"
              borderRadius="15px"
              pos="relative"
              >
              {/* 2 */}
              <BarChartDailyCase
                // width="100%"
                // height="100%"
                mode={1}
              />
            </Box>
          </Flex>
        </Flex>
        <Flex
          flexDir={["column", "column", "column", "row", "row"]}
          w="100%"
          h={["110vh", "110vh", "100vh", "50vh", "50vh"]}
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
        <Flex flexDir="column" w="100%" h="50vh">
          <Flex w="100%" h="100%" p={["5px", "5px", "5px", "10px", "15px"]}>
            <Box w="100%" h="100%" bg="#fff" borderRadius="15px">
              {/* 5 */}
                <BarChartDailyCase />
            </Box>
          </Flex>
        </Flex>
      </Flex>
      {/* <StatsBoard /> */}
      {/* <BarChartContinent /> */}
      {/* <BarChartCompound /> */}
      {/* <AreaChartARD /> */}
      {/* <Flex h="50%" flexDir="row" justifyContent="space-between">
        <Flex
          w="25%"
          m="1vh"
          borderRadius="15px"
          boxShadow="0px 4px 10px rgba(0,0,0,0.1)" */}
      {/* // overflow="auto" // > */}
      {/* <StatsBoard w="100%" /> */}
      {/* </Flex>
        {data ? (
          <Flex
            w="75%"
            m="1vh"
            borderRadius="15px"
            boxShadow="0px 4px 10px rgba(0,0,0,0.1)" */}
      {/* // overflow="auto" > */}
      {/* <Box> */}
      {/* <BarChartDailyCase data={data} /> */}
      {/* </Box> */}
      {/* </Flex>
        ) : null}
      </Flex> */}
      {/* <Flex
        h="48%"
        flexDir="column"
        // mt={6}
        m="1vh"
        mb="3vh"
        borderRadius="15px"
        boxShadow="0px 4px 10px rgba(0,0,0,0.1)"
      > */}
      {/* <Flex overflow="auto"> */}
      {/* <BarChartContinent
          data={mockData}
          continent={continent}
          mode="total_cases"
        /> */}
      {/* </Flex> */}
      {/* <Flex w="20vh">
        <Select onChange={(value) => setContinent(value.target.value)}>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
        </Select>
      </Flex> */}
      {/* </Flex> */}
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
