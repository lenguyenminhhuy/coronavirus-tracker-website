
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
  Brush,
  Line
} from "recharts";
import { Box, Select, RadioGroup, Stack, Radio, Flex, HStack, Checkbox, Center } from '@chakra-ui/react'
import CustomAxisX from "./shared/CustomAxisX";
import CustomTooltip from "./shared/CustomTooltip";
import normalizeCamelCase from "../utils/normalizeCamelCase";
import axios from 'axios'
import colors from '../constants/colors';
import Loading from './Loading';
import axiosCovid from "../config/axiosCovid";
import logger from "../config/logger";

function sortByAlphabet(array, key) {
  return array.sort((a,b) => {
    let x = a[key];
    let y = b[key];
    return ((x<y) ? -1 : ((x > y) ? 1: 0))
  })
}

function getMaxValue(array, type) {
  return Math.max.apply(Math, array.map((o) => {
    return o[type];
  }))
}

function BarChartDailyCase({
  mode,
  currentLocationISO3
}) {

  const [historyData, setHistoryData] = useState(null);
  const [countryList, setCountryList] = useState("");
  const [countryHistoryData, setCountryHistoryData] = useState(currentLocationISO3);
  const [radio, setRadio] = useState("totalCases");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    totalTests: true,
    totalVaccinations: true,
    totalCases: true,
    totalDeaths: false,
  })


  useEffect(() => {
    logger('dsss: ', currentLocationISO3);
      setLoading(true);
      axiosCovid.get("/api/countries")
      .then((res) => {
          setCountryList(sortByAlphabet(res.data,'location'))
          setLoading(false);
          if (currentLocationISO3 === null) {
            setCountryHistoryData(res.data[0].country)
          }
      })
    },[])

  useEffect(() => {
    setLoading(true);
    axiosCovid.get(`/api/history?country=${countryHistoryData}`).then((res) => {
      setHistoryData(res.data.data)
      setLoading(false);
    });
  }, [countryHistoryData]);

    return (
      // <React.Fragment>
      <Box w="100%" h="100%" position="relative">
        {loading?
        <Box position="absolute" display="flex" w="100%" h="100%" justifyContent="center" alignItems="center">
          <Loading/>
        </Box>
        :
        null
        }
      <Box opacity={loading? 0.2 : 1} w="100%" h="100%">
  <Select borderTop="none" borderRight="none" borderLeft="none" w="40%" borderRadius={0} borderColor={colors.grayDefault} onChange={(value) => setCountryHistoryData(value.target.value)}>
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
        <HStack>
          <Checkbox
            borderColor={colors.grayLight} borderWidth="2px"
            isChecked={status.totalVaccinations}
            onChange={(e) => setStatus({...status,totalVaccinations: e.target.checked})}
          >
            Total Vaccinations
          </Checkbox>
          <Checkbox
                      borderColor={colors.grayLight} borderWidth="2px"

            isChecked={status.totalTests}
            onChange={(e) => setStatus({...status,totalTests: e.target.checked})}
          >
            Total Test
          </Checkbox>
          <Checkbox
                      borderColor={colors.grayLight} borderWidth="2px"

            isChecked={status.totalCases}
            onChange={(e) => setStatus({...status,totalCases: e.target.checked})}
          >
            Total Deaths
          </Checkbox>
          <Checkbox
                      borderColor={colors.grayLight} borderWidth="2px"

            isChecked={status.totalDeaths}
            onChange={(e) => setStatus({...status,totalDeaths: e.target.checked})}
          >
            Total Test
          </Checkbox>
        </HStack>
    <Flex justifyContent="center" h="100%" w="100%">
    <ResponsiveContainer width="100%" height="90%">
        <ComposedChart
          width="80%"
          height="100%"
          // width={730}
          // height={250}
          data={historyData}
          margin={{ top: 5, right: 100, left: 100, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            minTickGap={20}
            dataKey="date"
            tick={<CustomAxisX mode="date" />}
          />
        {historyData?
        <YAxis domain={[0, historyData[0]['totalVaccinations']? getMaxValue(historyData, 'totalVaccinations') : 'dataMax']} allowDataOverflow={true} tickFormatter={(value) => value.toLocaleString()} />
          :
          null
        }
          <Tooltip content={<CustomTooltip mode="date" />} />
          <Legend verticalAlign="top" /> 
          {status.totalVaccinations?
            <Line dot={false} type="monotone" dataKey="totalVaccinations" name={normalizeCamelCase("totalVaccinations")} stroke={colors.oceanBlueDefault} />
          :
            null
          }       
          {status.totalTests?
              <Line dot={false} type="monotone" dataKey="totalTests" name={normalizeCamelCase("totalTests")} stroke={colors.grayDarkest} />
            :
            null
          }
          {status.totalCases?
              <Line dot={false} type="monotone" dataKey="totalCases" name={normalizeCamelCase("totalCases")} stroke={colors.yellowDefault} />
            :
            null
          }     
          {status.totalDeaths?
              <Line dot={false} type="monotone" dataKey="totalDeaths" name={normalizeCamelCase("totalDeaths")} stroke={colors.redDefault} />
            :
            null
          }          
          <Brush y={310} dataKey="date" height={20} stroke={colors.redLight}/>
          </ComposedChart>
      </ResponsiveContainer>
    </Flex>
   
        </Box>
                  
      </Box>
     
      // </React.Fragment>
    );
  }

BarChartDailyCase.propTypes = {
  mode: PropTypes.number
};

export default BarChartDailyCase;
