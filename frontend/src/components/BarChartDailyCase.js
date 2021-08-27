import React, { useState } from "react";
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
} from "recharts";
import CustomAxisX from "./shared/CustomAxisX";
import CustomTooltip from "./shared/CustomTooltip";

function BarChartDailyCase({
  // width = 730,
  // height = 450,
  width,
  height,
  data,
}) {
  const [chartData, useChartData] = useState(data);

  return (
    <React.Fragment>
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <ComposedChart
          // width={730}
          // height={250}
          width={"95%"}
          height={"70%"}
          data={data}
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
          <Bar type="monotone" dataKey="positive" fill="#82ca9d" />
        </ComposedChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

BarChartDailyCase.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default BarChartDailyCase;
