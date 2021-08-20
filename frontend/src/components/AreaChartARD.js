import React, { useState, useEffect } from "react";
import {
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Area,
	Tooltip,
	Legend,
} from "recharts";
import PropTypes from "prop-types";

const AreaChartARD = ({ width = 730, height = 250, data }) => {
	const [chartData, useChartData] = useState(data);

	// useEffect(() => {

	// }, [data])

	return (
		<React.Fragment>
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
		</React.Fragment>
	);
};

AreaChartARD.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	data: PropTypes.arrayOf(PropTypes.object),
};

export default AreaChartARD;
