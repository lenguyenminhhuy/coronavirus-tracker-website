import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
} from "recharts";

function BarChartDailyCase({ width = 730, height = 250, data }) {
	const [chartData, useChartData] = useState(data);

	return (
		<React.Fragment>
			<BarChart width={width} height={height} data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="pv" fill="#8884d8" />
				<Bar dataKey="uv" fill="#82ca9d" />
				<Bar dataKey="amt" fill="#ffc658" />
			</BarChart>
		</React.Fragment>
	);
}

BarChartDailyCase.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	data: PropTypes.arrayOf(PropTypes.object),
};

export default BarChartDailyCase;
