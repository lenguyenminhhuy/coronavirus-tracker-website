import React from "react";
import { Map, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./WorldMap.css";

const WorldMap = ({ countries }) => {
  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };

  const onEachCountry = (country, layer) => {
    layer.options.fillColor = country.properties.color;
    const name = country.properties.ADMIN;
    const confirmedText = country.properties.confirmedText;

    // layer.popup()
    // .setLatLng(country.properties)
    // .setContent(`${name}${confirmedText}`)
    // .openOn(); 
    console.log('country', country.properties)
    layer.bindPopup(`${name}${confirmedText}`);
    layer.on('mouseover', function (e) {
      this.openPopup();
    });
    layer.on('mouseout', function (e) {
        this.closePopup();
    });
    };

  return (
    <Map style={{ height: "90vh" }} zoom={2} center={[20, 60]}>
      <GeoJSON
        style={mapStyle}
        data={countries}
        onEachFeature={onEachCountry}
      />
    </Map>
  );
};

export default WorldMap;
