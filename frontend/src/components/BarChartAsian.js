import {useState, useEffect} from 'react';
import { BarChart, YAxis, XAxis, Tooltip, Legend, Bar } from 'recharts';

async function processData(data,mode) {
    let Asian = ["Vietnam", "Thailand", "Singapore", "Malaysia", "Phillipines", "Myanmar", "Laos", "Campodia", "Indonesia", "Brunei"];
    let array = [];
    for (let country in data) {
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
        <BarChart width={1000} height={500} data={chartData} layout="vertical" barCategoryGap={"0%"}>
            <XAxis type="number" />
            <YAxis dataKey="Country" type="category" interval={0} />
            <Tooltip />
            <Legend />
            <Bar dataKey={mode} name="Total Cases" fill="#8884d8"/>
        </BarChart>
    )
}

export default BarChartAsian;