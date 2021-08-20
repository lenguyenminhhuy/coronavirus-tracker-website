import "./App.css";
import dataImport from "./mock-data.json";
import React, { useState } from "react";
import BarChartAsian from "./components/barchart-asian";
import BarChartCompound from "./components/barchart-compound";
import AreaChartARD from "./components/AreaChartARD";
import BarChartDailyCase from "./components/BarChartDailyCase";

const mockData = [
	{
		name: "Page A",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Page B",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Page C",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Page D",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "Page E",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Page F",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Page G",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

function App() {
	const [country, setcountry] = useState("Thailand");
	const onChange = (event) => setcountry(event.target.value);

	return (
		<div className="App">
			<BarChartAsian data={dataImport} mode="total_cases" />
			<BarChartCompound data={dataImport} country={country} />
			<AreaChartARD data={mockData} />
			<BarChartDailyCase data={mockData} />
		</div>
	);
}

export default App;
