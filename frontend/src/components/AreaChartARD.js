import React, { useState, useEffect } from "react";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Center, Select, Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";

const AreaChartARD = ({ width = 730, height = 250, data }) => {
  const [chartData, useChartData] = useState(data);

  // useEffect(() => {

  // }, [data])

  return (
    <Flex
      w="100%"
      h="100%"
      bg="#fff"
      borderRadius="20px"
      justifyContent="center"
      alignItems="center"
      style={{ "box-shadow": "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
    >
      <ResponsiveContainer width="90%" height="90%" position="absolute">
        <AreaChart width={width} height={height} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="uv"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="amt"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};

AreaChartARD.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default AreaChartARD;
