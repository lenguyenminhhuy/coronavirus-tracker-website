import papa from "papaparse";
import React from "react";
import legendItems from "../legends/LegendItems";
import { features } from "../data/countries.json";
import MapFilter from "../components/MapFilter";
import axios from 'axios';

class LoadCountryData { 
  api = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv';
  setState = null;
  setMode = null;
  load = (setState, setMode) => {
    this.setState = setState;
    this.setMode = setMode;
    papa.parse(this.api, {
      download: true,
      header: true,
      complete: (result) => {this.#processCovidData(result.data)},
    });
    
  };  
  #processCovidData = (covidCountries) => {
    for (let i = 0; i < features.length; i++) {
      const country = features[i];
      // console.log("Country", country);
      const covidCountry = covidCountries.find(
        (covidCountry) => country.properties.ISO_A3 === covidCountry.iso_code
        );

      country.properties.confirmed = 0;
      country.properties.confirmedText = 0;
      

      if (covidCountry != null) {
        if('total_cases' in covidCountry){
          let confirmed = Number(covidCountry.total_cases);
          country.properties.confirmed = confirmed;
          country.properties.confirmedText = ("\n Total cases").concat(this.#formatNumberWithCommas(confirmed));
        }
        // if('total_deaths' in covidCountry){
        //   let confirmed = Number(covidCountry.total_deaths);
        //   country.properties.confirmed = confirmed;
        //   country.properties.confirmedText = ("\n Total deaths").concat(this.#formatNumberWithCommas(confirmed));
        // }
        // if('people_vaccincated' in covidCountry){
        //   let confirmed = Number(covidCountry.people_vaccincated);
        //   country.properties.confirmed = confirmed;
        //   country.properties.confirmedText = ("\n People vaccinated").concat(this.#formatNumberWithCommas(confirmed));
        // }
        // if('new_cases' in covidCountry){
        //   let confirmed = Number(covidCountry.new_cases);
        //   country.properties.confirmed = confirmed;
        //   country.properties.confirmedText = ("\n New cases").concat(this.#formatNumberWithCommas(confirmed));
        // }
          
    }
      this.#setCountryColor(country);
    }
    this.setState(features);
  };

  #setCountryColor = (country) => {
    const legendItem = legendItems.find((item) =>
      item.isFor(country.properties.confirmed)
    );

    if (legendItem != null) country.properties.color = legendItem.color;
  };

  #formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
}

export default LoadCountryData;
