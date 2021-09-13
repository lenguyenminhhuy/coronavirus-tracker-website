import "./Analysis.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import mockData from "../mock-data.json";
import { Flex, Heading, Box, Grid, GridItem, Select } from "@chakra-ui/react";
// Import Charts
import BarChartDailyCase from "../components/BarChartDailyCase";
import StatsBoard from "../components/StatsBoard";
import BarChartContinent from "../components/BarChartContinent";
import BarChartCompound from "../components/BarChartCompound";
import BarChartNew from '../components/BarChartNew';
import axiosLocation from "../config/axiosLocation";
import axiosFake from "../config/axiosFake";
import axiosCovid from "../config/axiosCovid";
import colors from '../constants/colors';
import BarChartCompare from "../components/BarChartCompare";
import logger from "../config/logger";

function sortByAlphabet(array, key) {
  return array.sort((a,b) => {
    let x = a[key];
    let y = b[key];
    return ((x<y) ? -1 : ((x > y) ? 1: 0))
  })
}


function Analysis() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json",
    );
    setChartData(response.data);
  };

  const [currentLocationISO3, setCurrentLocationISO3] = useState(null);
  const [countryList, setCountryList] = useState("");
  const [countryHistoryData, setCountryHistoryData] = useState(currentLocationISO3);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
      setLoading(true);
      axiosCovid.get("/api/countries")
      .then((res) => {
          setCountryList(sortByAlphabet(res.data,'location'))
          setLoading(false);
      })
    },[])
    
  useEffect(async () => {
    axiosLocation.get()
    .then((res) => {
      if (res.data.country_code_iso3) {
        setCurrentLocationISO3(res.data.country_code_iso3);
        setCountryHistoryData(res.data.country_code_iso3);
      } else {
        setCurrentLocationISO3(countryList[0].country);
        setCountryHistoryData(countryList[0].country);
      }
    })
    .catch((err) => setCurrentLocationISO3(null))
  }, [])

  useEffect(() => {
    logger(countryHistoryData);
  }, [countryHistoryData]);


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
                key={currentLocationISO3}
                currentLocationISO3={currentLocationISO3}
                mode={1}
              />
            </Box>
          </Flex>
        </Flex>
        <Flex
          className="analysisRow container2"
          flexDir={["column", "column", "column", "row", "row"]}
        >
          <Flex
            className="analysisChart chart4"
            w={["100%", "100%", "100%", "100%", "100%"]}
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <BarChartContinent data={chartData} />
          </Flex>
        </Flex>
        <Flex
          className="analysisRow container3" 
          h="100%"
          flexDir={["column", "column", "column", "row", "row"]}
          >
          <Flex
            className="analysisChart chart5"
            w="100%"
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <Box w="100%" h="100%" bg="#fff" borderRadius="15px">
              {/* 5 */}
                <BarChartDailyCase
                key={currentLocationISO3}
                currentLocationISO3={currentLocationISO3}
              />
               
            </Box>
          </Flex>
        </Flex>
        <Box bg="#fff">
        <Select
          borderTop="none" 
          borderRight="none" 
          borderLeft="none" 
          w="40%" 
          borderRadius={0} 
          borderColor={colors.grayDefault}
          onChange={(value) => setCountryHistoryData(value.target.value)}>
                {countryList?
                      countryList.map(c => {
                        if (c.country === countryHistoryData)
                          return <option selected key={c.country} value={c.country}>{c.location}</option>
                        else
                          return <option key={c.country} value={c.country}>{c.location}</option>
                  
                      })
                :
                null
                }
            </Select>
            <Grid  p={["5px", "5px", "5px", "10px", "15px"]} w="100%" h="100%" templateColumns={["repeat(1,1fr)","repeat(1,1fr)","repeat(3,1fr)","repeat(3,1fr)"]} gap={4}>
          <GridItem bg="#fff"  borderRadius="15px">
            <BarChartNew type="newDeaths" key={countryHistoryData} countryHistoryData={countryHistoryData}/>
          </GridItem>
          <GridItem bg="#fff"  borderRadius="15px">
            <BarChartNew type="newCases" key={countryHistoryData} countryHistoryData={countryHistoryData}/>
          </GridItem>
          <GridItem bg="#fff"  borderRadius="15px">
            <BarChartNew type="newTests" key={countryHistoryData} countryHistoryData={countryHistoryData}/>
          </GridItem>
        </Grid>
        </Box>
      </Flex>
    </Flex>
  );
}
export default Analysis;
