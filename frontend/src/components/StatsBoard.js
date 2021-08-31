import React, { useEffect, useState } from "react";
import { ResponsiveContainer } from "recharts";
import StatsBox from "./StatsBox";
import styles from "./StatsBoard.module.css";
import dataImport from "../mock-data.json";
import colors from "../constants/colors";
import { Box, Center, Select, Flex } from "@chakra-ui/react";
import color from "../constants/colors";

async function getCountries(data) {
  let array = [];
  for (let item in data) {
    array.push(data[item].location);
  }
  return array;
}

async function getStats(data, country) {
  let obj = {};
  for (let item in data) {
    if (data[item].location === country) {
      obj["cases"] = data[item].total_cases;
      obj["deaths"] = data[item].total_deaths;
      obj["tests"] = data[item].total_tests;
      obj["vaccinations"] = data[item].total_vaccinations;
    }
  }
  return obj;
}

function StatsBoard() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Vietnam");
  const [cases, setCases] = useState();
  const [tests, setTests] = useState();
  const [vaccinations, setVaccinations] = useState();
  const [deaths, setDeaths] = useState();

  useEffect(() => {
    getCountries(dataImport).then((res) => {
      setCountries(res);
    });
    return () => {};
  }, []);

  useEffect(() => {
    getStats(dataImport, selectedCountry).then((res) => {
      setCases(res.cases);
      setDeaths(res.deaths);
      setVaccinations(res.vaccinations);
      setTests(res.tests);
    });
  }, [selectedCountry]);

  return (
    // <ResponsiveContainer width="100%" height="100%">
    <Flex w="100%" h="100%" bg="#fff" borderRadius="20px">
      <Box className={styles.statsBoardContainer} width="100%">
        <Box mb={5}>Statistics on coronavirus</Box>
        <Center mb={5} textAlign="center">
          <Select
            borderBottomColor={color.grayLight}
            borderTop="hidden"
            borderRight="hidden"
            borderLeft="hidden"
            borderBottomRadius={0}
            borderBottomWidth={2}
            maxW="xs"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries
              ? countries.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))
              : null}
          </Select>
        </Center>
        <div className={styles.statsContainer}>
          <StatsBox
            label="Cases"
            value={cases}
            valueContainerColor={colors.yellowLightest}
            labelContainerColor={colors.yellowLighter}
            textColor={colors.yellowDark}
          />
          <StatsBox
            label="Vaccinations"
            value={vaccinations}
            valueContainerColor={colors.oceanBlueLighter}
            labelContainerColor={colors.oceanBlueLight}
            textColor={colors.oceanBlueDark}
          />
          <StatsBox
            label="Tests"
            value={tests}
            valueContainerColor={colors.grayLighter}
            labelContainerColor={colors.grayLight}
            textColor={colors.grayDark}
          />
          <StatsBox
            label="Deaths"
            value={deaths}
            valueContainerColor={colors.redLighter}
            labelContainerColor={colors.redLight}
            textColor={colors.redDark}
          />
        </div>
      </Box>
    </Flex>
    // </ResponsiveContainer>
  );
}

export default StatsBoard;
