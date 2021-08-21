import React, {useEffect, useState} from 'react'
import StatsBox from './StatsBox'
import styles from './StatsBoard.module.css';
import dataImport from '../mock-data.json';
import colors from '../constants/colors';

async function getCountries(data) {
    let array = [];
    for (let item in data) {
      array.push(data[item].location);
    }
    return array;
}

async function getStats(data, country) {
    let obj = {};
    for (let item in data) {
        if (data[item].location === country) {
            obj['cases'] = data[item].total_cases;
            obj['deaths'] = data[item].total_deaths;
            obj['tests'] = data[item].total_tests;
            obj['vaccinations'] = data[item].total_vaccinations;

        }
    }
    return obj;
}

function StatsBoard() {

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("Vietnam");
    const [cases, setCases] = useState();
    const [tests, setTests] = useState();
    const [vaccinations, setVaccinations] = useState();
    const [deaths, setDeaths] = useState();


    useEffect(() => {
        getCountries(dataImport)
        .then((res) => {
            setCountries(res);
        })
        return () => {
            
        }
    }, [])

    useEffect(() => {
        getStats(dataImport, selectedCountry)
        .then((res) => {
            setCases(res.cases);
            setDeaths(res.deaths);
            setVaccinations(res.vaccinations);
            setTests(res.tests)
        })
    },[selectedCountry])


    return (
        <div className={styles.statsBoardContainer}>
            <div>
                Statistics on coronavirus
            </div>
            <div>
                <label>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                    {countries? 
                    countries.map(c => (
                        <option value={c}>
                            {c}
                        </option>
                    ))
                    : (null)}
                </select>
                </label>
            </div>
            <div className={styles.statsContainer}>
                <StatsBox label="Cases" value={cases} valueContainerColor={colors.yellowLightest} labelContainerColor={colors.yellowLighter} textColor={colors.yellowDark} />
                <StatsBox label="Vaccinations" value={vaccinations} valueContainerColor={colors.oceanBlueLighter} labelContainerColor={colors.oceanBlueLight} textColor={colors.oceanBlueDark} />
                <StatsBox label="Tests" value={tests} valueContainerColor={colors.grayLighter} labelContainerColor={colors.grayLight} textColor={colors.grayDark} />
                <StatsBox label="Deaths" value={deaths}valueContainerColor={colors.redLighter} labelContainerColor={colors.redLight} textColor={colors.redDark} />
            </div>
        </div>
    )
}

export default StatsBoard;