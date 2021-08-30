import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ComposedChart,
  ResponsiveContainer,
  Line
} from "recharts";
import { Box, Select, RadioGroup, Stack, Radio, Flex } from '@chakra-ui/react'
import CustomAxisX from "./shared/CustomAxisX";
import CustomTooltip from "./shared/CustomTooltip";
import normalizeCamelCase from "../utils/normalizeCamelCase";
import axios from 'axios'
import colors from '../constants/colors';

function sortByAlphabet(array, key) {
  return array.sort((a,b) => {
    let x = a[key];
    let y = b[key];
    return ((x<y) ? -1 : ((x > y) ? 1: 0))
  })
}

function BarChartDailyCase({
  data,
  mode
}) {

  const [historyData, setHistoryData] = useState([]);
  const [countryList, setCountryList] = useState("");
  const [countryHistoryData, setCountryHistoryData] = useState("");
  const [radio, setRadio] = useState("totalCases");


  useEffect(() => {
    axios.get("https://79dvu6wjq3.execute-api.us-east-2.amazonaws.com/Prod/api/countries")
    .then((res) => {
        setCountryList(sortByAlphabet(res.data,'location'))
        setCountryHistoryData(res.data[0].country)
    })
    },[])

  useEffect(() => {
    axios.get(`https://79dvu6wjq3.execute-api.us-east-2.amazonaws.com/Prod/api/history?country=${countryHistoryData}`).then((res) => {
      setHistoryData(res.data.data)
      console.log(res.data);
    });
  }, [countryHistoryData]);



  if (mode === 1) {
    return (
      // <React.Fragment>
      <Box w="100%" h="100%">
          <Flex flexDirection="row">
            <Select borderTop="none" borderRight="none" borderLeft="none" w="40%" borderRadius={0} borderColor={colors.grayDefault} onChange={(value) => setCountryHistoryData(value.target.value)}>
                {countryList?
                    countryList.map(c => (
                        <option key={c.country} value={c.country}>{c.location}</option>
                    ))
                :
                null
                }
            </Select>
            <RadioGroup onChange={setRadio} value={radio}>
              <Stack direction="row">
                  <Radio value="totalCases">Total Cases</Radio>
                  <Radio value="totalDeaths">Total Deaths</Radio>
              </Stack>
            </RadioGroup>
          </Flex>
 <ResponsiveContainer width="90%" height="90%" position="absolute">
        <ComposedChart
          width="100%"
          height="100%"
          // width={"95%"}
          // height={"70%"}
          data={historyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            minTickGap={20}
            dataKey="date"
            tick={<CustomAxisX mode="date" />}
          />
          <YAxis tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />        
          <Bar type="monotone" dataKey={radio} name={normalizeCamelCase(radio)} fill="#82ca9d" />
        </ComposedChart>
      </ResponsiveContainer>
      </Box>
     
      // </React.Fragment>
    );
  }
    return (
      // <React.Fragment>
      <Box w="100%" h="100%">
                    <Select borderTop="none" borderRight="none" borderLeft="none" w="40%" borderRadius={0} borderColor={colors.grayDefault} onChange={(value) => setCountryHistoryData(value.target.value)}>
                {countryList?
                    countryList.map(c => (
                        <option key={c.country} value={c.country}>{c.location}</option>
                    ))
                :
                null
                }
            </Select>
            <ResponsiveContainer width="90%" height="90%" position="absolute">
        <ComposedChart
          width="100%"
          height="100%"
          // width={"95%"}
          // height={"70%"}
          data={historyData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            minTickGap={20}
            dataKey="date"
            tick={<CustomAxisX mode="date" />}
          />
          <YAxis tickFormatter={(value) => value.toLocaleString()} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />        
          <Bar type="monotone" dataKey="totalTests" name={normalizeCamelCase("totalTests")} fill="#82ca9d" />
          <Line type="monotone" dataKey="totalVaccinations" name={normalizeCamelCase("totalVaccinations")} color="#a2ca9d" />
        </ComposedChart>
      </ResponsiveContainer>
      </Box>
     
      // </React.Fragment>
    );
  }

BarChartDailyCase.propTypes = {
  mode: PropTypes.string
};

export default BarChartDailyCase;
