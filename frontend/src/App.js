import './App.css';
import dataImport from './mock-data.json';
import React, {useState} from 'react';
import BarChartAsian from './components/barchart-asian';
import BarChartCompound from './components/barchart-compound';
import StatsBoard from './components/stats-board';


function App() {
  const [country, setcountry] = useState("Thailand");
  const onChange = event => setcountry(event.target.value);

  return (
    <div className="App">
      <StatsBoard/>    
      <BarChartAsian data={dataImport} mode="total_cases"/>
      <BarChartCompound data={dataImport} country={country}/>
    </div>
  );
}

export default App;
