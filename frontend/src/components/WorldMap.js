import React from "react";
import { Map, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./WorldMap.css";
import legendCases from "../legends/LegendCase";
import legendDeaths from "../legends/LegendDeath";
import legendVacs from "../legends/LegendVax";
import legendTests from "../legends/LegendTest";

const WorldMap = ({countries, options}) => {

  const mapState = {
      lat: 40,
      lng: 10,
      zoom: 1
    };
  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };

  const onDeaths = (country, layer) => {
    const legendItem = legendDeaths.find((item) =>
    item.isFor(country.properties['deaths'])
  );
  if (legendItem != null) country.properties.color = legendItem.color

    let name = country.properties.ADMIN
    layer.options.fillColor = country.properties.color;
    let displayText = country.properties['total_deaths'];   

    layer.bindPopup(`${name}${displayText}`);
    layer.on('mouseover', function (e) {
      this.openPopup();
    });
    layer.on('mousemove', function (e) {
      this.openPopup();
    });
    layer.on("mouseout", function (e) {
      this.closePopup();
    });
  };
  
  const onVaccinated = (country, layer) => {
    const legendItem = legendVacs.find((item) =>
    item.isFor(country.properties['vaccinated'])
  );
  if (legendItem != null) country.properties.color = legendItem.color

    let name = country.properties.ADMIN
    layer.options.fillColor = country.properties.color;
    let displayText = country.properties['total_vaccinations'];   
     
    layer.bindPopup(`${name}${displayText}`);
    layer.on('mouseover', function (e) {
      this.openPopup();
    });
    layer.on("mouseout", function (e) {
      this.closePopup();
    });
  }

  const onCases = (country, layer) => {
    const legendItem = legendCases.find((item) =>
    item.isFor(country.properties['confirmed'])
    );
    if (legendItem != null) country.properties.color = legendItem.color;

    let name = country.properties.ADMIN
    layer.options.fillColor = country.properties.color;
    let displayText = country.properties['total_cases'];   
     
    layer.bindPopup(`${name}${displayText}`);
    layer.on('mouseover', function (e) {
      this.openPopup();
    });
    layer.on("mouseout", function (e) {
      this.closePopup();
    });
  };

  const onTest = (country, layer) => {
    const legendItem = legendTests.find((item) =>
    item.isFor(country.properties['tested'])
    );
    if (legendItem != null) country.properties.color = legendItem.color

    let name = country.properties.ADMIN
    layer.options.fillColor = country.properties.color;
    let displayText = country.properties['total_tests'];   
     
    layer.bindPopup(`${name}${displayText}`);
    layer.on('mouseover', function (e) {
      this.openPopup();
    });
    layer.on("mouseout", function (e) {
      this.closePopup();
    });
  };

  const switchCase = (mode) => {
    switch(mode) {
      case 'total_cases':
        return onCases;
      case 'total_deaths':
        return onDeaths;
      case 'people_vaccinated':
        return onVaccinated;
      case 'total_tests':
        return onTest;
    }
  };


  return (
    <div>

      <Map style={{ height: "50vh", width: "100%", border: "1px solid black"}} zoom={mapState.zoom} center={[mapState.lat, mapState.lng]}>
       <GeoJSON
            key={options}
            style={mapStyle}
            data={countries}
            onEachFeature={switchCase(options)}/>
        </Map>
    </div>

  );

};

export default WorldMap;
