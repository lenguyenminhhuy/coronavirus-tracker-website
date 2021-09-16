import axios from 'axios';
import React, {useState, useEffect} from 'react';
import logger from '../config/logger';
import {
  BarChart,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { Flex, Heading, Select, Text } from "@chakra-ui/react";
import CustomAxisX from './shared/CustomAxisX';
import CustomTooltip from './shared/CustomTooltip';
import normalizeCamelCase from '../utils/normalizeCamelCase';

async function processData(data, mode) {
    let array = [];
    for (let i in data) {
        let base = {};
        base[mode] = data[i][mode];
        base["Country"] = data[i].location;
        if (["World", "Europe", "Asia", "North America", "South America", "Africa"].indexOf(base["Country"]) === -1) {
            array.push(base);
        }
    }
    let sortedArray = await array.sort((a,b) => {
      return b[mode] - a[mode];
    })
    return sortedArray.slice(0,10);
}
  

function BarChartTopTen({data}) {

    const [topTen, setTopTen] = useState([]);

    const [mode, setMode] = useState("totalCases");

    useEffect(() => {
        processData(data, mode)
        .then((res) => {
            setTopTen(res)
        });
    },[data, mode])

    useEffect(() => {
        logger(topTen)
    }, [topTen])
    



    const modeList = [
        { label: "Total cases", key: "totalCases" },
        { label: "Total deaths", key: "totalDeaths" },
        { label: "Total tests", key: "totalTests" },
        { label: "Total vaccinations", key: "totalVaccine" },
      ];
    

    return (
        <Flex
        w="100%"
        h="100%"
        bg="#fff"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        borderRadius="15px"
        position="relative"
        // boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
      >
        <Text position="absolute" top={10} right={34} fontWeight={500}>Most 10th countries</Text>
        <Flex flexDir="row">
          <Select
            border="none"
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
            }}
          >
            {modeList.map((item, index) => (
              <option key={index} value={item.key}>
                {item.label}
              </option>
            ))}
          </Select>
        </Flex>
        <ResponsiveContainer width="90%" height="90%">
          <BarChart
            width={730}
            height={250}
            data={topTen}
            barCategoryGap={"0%"}
            margin={{ top: 10, right: 40, left: 40, bottom: 20 }}
          >
            <XAxis label={{value: 'Country', position: 'insdieBottomRight'}} dataKey="Country" tick={<CustomAxisX mode="topten"/>} />
            <YAxis
              tickFormatter={(value) => value.toLocaleString()}
              interval={0}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={mode} name={mode}  name={normalizeCamelCase(mode)} fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
    )
    
}

export default BarChartTopTen;