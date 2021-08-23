import {useState, useEffect} from 'react';
import { BarChart, YAxis, XAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import CustomTooltip from "./shared/CustomTooltip";

async function processData(data,mode) {
    let Asian = ["Vietnam", "Thailand", "Singapore", "Malaysia", "Phillipines", "Myanmar", "Laos", "Campodia", "Indonesia", "Brunei"];
    let array = [];
    for (let country in data) {
      console.log(country);
      if (Asian.includes(data[country].location) && data[country][mode] != null) {
        let base = {};
        base[mode] = data[country][mode];
        base['Country'] = data[country].location;
        array.push(base);
      }
    }
    return array;
  }



function BarChartAsian({data, mode}) {

    const [chartData, setChartData]  = useState();

    useEffect(() => {
        processData(data,mode)
        .then((res) => {
            setChartData(res);
        })
    }, [])


    return (
      <ResponsiveContainer width={'100%'} height={450}>
        <BarChart width={730} height={250} data={chartData} barCategoryGap={"0%"}
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="Country" />
            <YAxis tickFormatter={(value) => value.toLocaleString()} interval={0} />
            <Tooltip content={<CustomTooltip/>} />
            <Legend />
            <Bar dataKey={mode} name="Total Cases" fill="#8884d8"/>
        </BarChart>
      </ResponsiveContainer>

    )
}

BarChartAsian.propTypes = {
  mode: PropTypes.string
}

export default BarChartAsian;