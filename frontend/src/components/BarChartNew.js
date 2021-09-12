import React, {useEffect, useState} from 'react';
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
import { Box, Select, RadioGroup, Stack, Radio, Flex } from '@chakra-ui/react'
import CustomAxisX from "./shared/CustomAxisX";
import CustomTooltip from "./shared/CustomTooltip";
import normalizeCamelCase from "../utils/normalizeCamelCase";
import axios from 'axios'
import colors from '../constants/colors';
import Loading from './Loading';
import axiosCovid from '../config/axiosCovid';

function getMaxValue(array, type) {
  return Math.max.apply(Math, array.map((o) => {
    return o[type];
  }))
}

function renderYAxis(type, data ) {
  
  let types = {
    newDeaths: 'newDeaths',
    newCases: 'newCases',
    newTests: 'newTests'
  }

  const max = (data) => {
    console.log(data);
    return data[data.length-1].type
  }

  switch(type) {
    case types.newDeaths:
      return (
        <YAxis domain={[0, `dataMax + ${max(data)}` ]} tickFormatter={(value) => value.toLocaleString()} />
      )
    case types.newCases:
      return (
        <YAxis domain={[0, `dataMax + ${max(data)}` ]} tickFormatter={(value) => value.toLocaleString()} />
      )
    case types.newTests:
      return (
        <YAxis domain={[0,  ]} tickFormatter={(value) => value.toLocaleString()} />
      )
  }
  
}

function BarChartNew(props) {
    const defaultCountry = "VNM";
    const [historyData, setHistoryData] = useState();
    const [countryHistoryData, setCountryHistoryData] = useState(props.countryHistoryData === null? defaultCountry : props.countryHistoryData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosCovid.get(`/api/history?country=${countryHistoryData}`).then((res) => {
          setHistoryData(res.data.data)
          console.log('change', res.data);
          setLoading(false);
        });
        console.log(countryHistoryData);
      }, [props.countryHistoryData]);

    return (
        <Box w="100%" h="100%">
      <ResponsiveContainer width="100%" height="90%" aspect={1}>
        <ComposedChart
          width="100%"
          height="100%"
          data={historyData}
          margin={{ top: 20, right: 30, left: 30, bottom: 30 }}

        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            minTickGap={20}
            dataKey="date"
            tick={<CustomAxisX mode="date" />}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" />   
          {historyData?
          <YAxis domain={[0, historyData[0][props.type]? getMaxValue(historyData, props.type) : 'dataMax']} tickFormatter={(value) => value.toLocaleString()} />
         :
         null 
        
          }   
        
          <Bar type="monotone" dataKey={props.type} name={normalizeCamelCase(props.type)} fill="#82ca9d" />
          </ComposedChart>
      </ResponsiveContainer>
        </Box>
    )
}

export default BarChartNew;