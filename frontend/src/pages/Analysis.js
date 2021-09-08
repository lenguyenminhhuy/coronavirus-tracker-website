import { Box, Select } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import BarChartDailyCase from '../components/BarChartDailyCase'
import StatsBoard from '../components/StatsBoard'
import axios from 'axios'
import BarChartContinent from '../components/BarChartContinent'
import mockData from '../mock-data.json';

async function processData(data) {
    let array = [];
    for (let i = 0; i < data.length; i++) {
        let obj = {};
        obj['date'] = data[i].Date;
        obj['positive'] = data[i].Confirmed;
        array.push(obj);
    }
    return array;
}

function Analysis() {

    const [data, setData] = useState([]);
    const [continent, setContinent] = useState("Asia");

    useEffect(() => {
        axios.get('https://api.covid19api.com/country/south-africa')
        .then((res) => {
            processData(res.data)
            .then((processedData) => {
                setData(processedData);
            })
        })
    }, [])

    useEffect(() => {
        console.log(continent);
    }, [continent])

    return (
        <div>
            <Box margin="0 auto" maxW='50%' boxShadow="0px 4px 10px rgba(0,0,0,0.1)">
                <StatsBoard/>
            </Box>
            {data?
            <Box>
                <BarChartDailyCase data={data}/>
            </Box>
                    : 
                null
            }
            <Box>
                <Select onChange={(value) => setContinent(value.target.value)}>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="Europe">Europe</option>
                    <option value="South America">South America</option>
                    <option value="North America">North America</option>
                </Select>
                <BarChartContinent data={mockData} continent={continent} mode="total_cases" />
            </Box>
        </div>
    )
}

export default Analysis