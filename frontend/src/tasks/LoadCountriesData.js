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
      country.properties.total_cases = 0;

      country.properties.deaths = 0;
      country.properties.total_deaths = 0;

      country.properties.tested = 0;
      country.properties.total_tests = 0;

      country.properties.vaccinated = 0;
      country.properties.total_vaccinations = 0;
      

      if (covidCountry != null) {
          let confirmed = Number(covidCountry.total_cases);
          country.properties.confirmed = confirmed;
          country.properties.total_cases = ("\n Total cases ").concat(this.#formatNumberWithCommas(confirmed));

          let deaths = Number(covidCountry.total_deaths);
          country.properties.deaths = deaths;
          country.properties.total_deaths = ("\n Total deaths ").concat(this.#formatNumberWithCommas(deaths));

          let tested = Number(covidCountry.total_tests);
          country.properties.tested = tested;
          country.properties.total_tests = ("\n Total tested cases ").concat(this.#formatNumberWithCommas(tested));

          let vaccinated = Number(covidCountry.total_vaccinations);
          country.properties.vaccinated = vaccinated;
          country.properties.total_vaccinations = ("\n Total vaccinations ").concat(this.#formatNumberWithCommas(vaccinated));
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
