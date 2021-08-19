import papa from "papaparse";
import legendItems from "../legends/LegendItems";
import { features } from "../data/countries.json";
//    this.setState(features);
console.log('feature', features)

class LoadCountryData {
  // covidUrl =
  //   "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv";
  
  covidUrl = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv';
  setState = null;

  load = (setState) => {
    this.setState = setState;

    papa.parse(this.covidUrl, {
      download: true,
      header: true,
      complete: (result) => this.#processCovidData(result.data),
    });
  };
  #processCovidData = (covidCountries) => {
    for (let i = 0; i < features.length; i++) {
      const country = features[i];
      //console.log(country);
      const covidCountry = covidCountries.find(
        (covidCountry) => country.properties.ISO_A3 === covidCountry.iso_code
      
        );


      country.properties.confirmed = 0;
      country.properties.confirmedText = 0;


      if (covidCountry != null) {
        let confirmed = Number(covidCountry.total_cases);
        country.properties.confirmed = confirmed;
        country.properties.confirmedText = "\nTotal cases: ".concat(this.#formatNumberWithCommas(confirmed));
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
