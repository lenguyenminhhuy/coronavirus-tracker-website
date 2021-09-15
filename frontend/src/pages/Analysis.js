import "./Analysis.css";
import React, { useEffect, useState } from "react";
import { Flex, Heading, Box, Grid, GridItem, Select } from "@chakra-ui/react";
// Import Charts
import BarChartDailyCase from "../components/BarChartDailyCase";
import StatsBoard from "../components/StatsBoard";
import BarChartContinent from "../components/BarChartContinent";
import BarChartNew from "../components/BarChartNew";
import axiosFake from "../config/axiosFake";
import axiosCovid from "../config/axiosCovid";
import axiosLocation from "../config/axiosLocation";
import colors from "../constants/colors";
import logger from "../config/logger";
import BarChartTopTen from "../components/BarChartTopTen";
import Loading from "../components/Loading";

async function sortByAlphabet(array, key) {
  return array.sort((a, b) => {
    let x = a[key];
    let y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

function Analysis() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axiosCovid.get("/api/daily")
    .then((res) => {
      setChartData(res.data);
    })
    .catch((err) => {
      logger('error fetching daily', err)
    })
  }, []);


  const [countryList, setCountryList] = useState([]);
  const [countryHistoryData, setCountryHistoryData] = useState();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   axiosCovid.get("/api/countries").then((res) => {
  //     setCountryList(sortByAlphabet(res.data, "location"));
  //     setLoading(false);
  //   });
  // }, []);
    
  // useEffect(() => {
  //   setLoading(true);
  //   axiosFake.get()
  //   .then((res) => {
  //     if (res.data.country_code_iso3) {
  //       console.log('wtf: ', countryList[0].country);
  //       setCurrentLocationISO3(res.data.country_code_iso3);
  //       setCountryHistoryData(res.data.country_code_iso3);
  //     } else {
  //       console.log('wtf: ', countryList[0].country);
  //       setCurrentLocationISO3(countryList[0].country);
  //       setCountryHistoryData(countryList[0].country);
  //     }
  //     setLoading(false)
  //   })
  //   .catch((err) => {
  //     console.log('err: ',countryList);
  //     logger("Error in fetching current location: ", err)
  //     setCurrentLocationISO3(countryList[0]?.country);
  //     setLoading(false);
  //   })
  // }, [])

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      setLoading(true);
      let response = await axiosCovid.get("/api/countries");
      if (mounted) {
        setCountryList(await sortByAlphabet(response.data, "location"));
      }
      setLoading(false);
    }
    fetchData();
    return () => {
      mounted = false;
    }
  },[])

  useEffect(() => {
    let mounted = true;
    async function fetchCurrentLocation () {
      setLoading(true);
      if (countryList.length != 0) {
        try {
          let response =  await axiosLocation.get();
          console.log('dsdsa: ', response);
          if (mounted) {
            if (response.data.country_code_iso3) {
              setCountryHistoryData(response.data.country_code_iso3);
            } else {
              setCountryHistoryData(countryList[0]?.country);
            }
          }
        setLoading(false);
        } catch(err) {
          logger("error at fetch current location")
          setCountryHistoryData(countryList[0]?.country)
        }
    }
  }
  fetchCurrentLocation();
    return () => {
      mounted = false;
    }
  }, [countryList])

  
  return (

    <Flex className="analysisMain" w="100%" flexDir="column">
      {loading?
        <Loading/>

        :
    <>
       {/* *** HEADING *** */}
       <Flex className="analysisHeading" flexDir="row" w="100%">
        <Heading color="#000">Analysis</Heading>
      </Flex>

      {/* *** Chart grid *** */}
      <Flex className="analysisContent" flexDir="column">
        <Flex
          className="analysisRow container1"
          flexDir={["column", "column", "column", "row", "row"]}
        >
          <Flex
            className="analysisChart chart1"
            w={["100%", "100%", "100%", "50%", "50%"]}
            p={["5px", "5px", "5px", "10px", "15px"]}
          >
            <StatsBoard />
          </Flex>
          <Flex
            className="analysisChart chart2"
            w={["100%", "100%", "100%", "50%", "50%"]}
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
                <BarChartTopTen data={chartData}/>
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
            <Select
            borderTop="none"
            borderRight="none"
            borderLeft="none"
            w="40%"
            borderRadius={0}
            borderColor={colors.grayDefault}
            onChange={(value) => setCountryHistoryData(value.target.value)}
          >
            {countryList
              ? countryList.map((c) => {
                  if (c.country === countryHistoryData)
                    return (
                      <option selected key={c.country} value={c.country}>
                        {c.location}
                      </option>
                    );
                  else
                    return (
                      <option key={c.country} value={c.country}>
                        {c.location}
                      </option>
                    );
                })
              : null}
          </Select>
              <BarChartDailyCase
                key={countryHistoryData}
                currentLocationISO3={countryHistoryData}
              />
            </Box>
          </Flex>
        </Flex>
        <Box bg="#fff">
          <Grid
            p={["5px", "5px", "5px", "10px", "15px"]}
            w="100%"
            h="100%"
            templateColumns={[
              "repeat(1,1fr)",
              "repeat(1,1fr)",
              "repeat(3,1fr)",
              "repeat(3,1fr)",
            ]}
            gap={4}
          >
            <GridItem bg="#fff" borderRadius="15px">
              <BarChartNew
                type="newDeaths"
                key={countryHistoryData}
                countryHistoryData={countryHistoryData}
              />
            </GridItem>
            <GridItem bg="#fff" borderRadius="15px">
              <BarChartNew
                type="newCases"
                key={countryHistoryData}
                countryHistoryData={countryHistoryData}
              />
            </GridItem>
            <GridItem bg="#fff" borderRadius="15px">
              <BarChartNew
                type="newTests"
                key={countryHistoryData}
                countryHistoryData={countryHistoryData}
              />
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </>
      }
     
    </Flex>
  );
}
export default Analysis;
