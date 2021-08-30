import papa from "papaparse";
import legendItems from "../legends/LegendItems";
import { features } from "../data/countries.json";
import axios from 'axios';

class LoadCountryData { 
  api = 'https://79dvu6wjq3.execute-api.us-east-2.amazonaws.com/Prod/api/daily';
  setState = null;
  
  load = (countries) => {
    this.setState = countries;
    axios.get(this.api)
    .then((res) => {
      this.#processCovidData(res.data)
    }).catch(error => {
      throw(error);
  })
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
          let confirmed = Number(covidCountry.totalCases);
          country.properties.confirmed = confirmed;
          country.properties.total_cases = ("\n Total cases ").concat(this.#formatNumberWithCommas(confirmed));

          let deaths = Number(covidCountry.totalDeaths);
          country.properties.deaths = deaths;
          country.properties.total_deaths = ("\n Total deaths ").concat(this.#formatNumberWithCommas(deaths));

          let tested = Number(covidCountry.totalTests);
          country.properties.tested = tested;
          country.properties.total_tests = ("\n Total tested cases ").concat(this.#formatNumberWithCommas(tested));

          let vaccinated = Number(covidCountry.totalVaccine);
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
