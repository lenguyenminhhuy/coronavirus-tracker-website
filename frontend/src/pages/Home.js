import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import Highlight from "../components/Highlight";
import Summary from "../components/Summary";
import { Heading, Flex } from "@chakra-ui/react";

function WorldMap() {
  const [information, setInformation] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json",
      )
      .then((res) => {
        setInformation(res.data.OWID_WRL);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://79dvu6wjq3.execute-api.us-east-2.amazonaws.com/Prod/api/daily",
      )
      .then((res) => {
        console.log("test api", res);
      });
  }, []);

  const dataHighlight = useMemo(() => {
    if (information) {
      return [
        {
          title: "Total confirmed cases",
          count: information.total_cases,
          type: "confirmed",
        },
        {
          title: "Total death cases",
          count: information.total_deaths,
          type: "death",
        },
        {
          title: "Total vaccinated cases",
          count: information.total_vaccinations,
          type: "vaccinated",
        },
      ];
    }
    return [];
  }, [information]);

  return (
    <Flex w="100%" flexDir="column">
      {/* *** HEADING *** */}
      <Flex flexDir="row" w="100%">
        <Heading color="#000">Worlds</Heading>
      </Flex>

      {/* *** Map *** */}
      <Flex flexDir="column" w="100%">
        <Highlight infor={dataHighlight} />
        <Summary />
      </Flex>
    </Flex>
  );
}
export default WorldMap;
