import React from "react";
import { Map, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./WorldMap.css";
import { TileLayer } from "react-leaflet";


const WorldMap = ({countries, options}) => {

  const state = {
      lat: 50,
      lng: 10,
      zoom: 1.5
    };
  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };

  const onEachCountry = (country, layer) => {

    layer.options.fillColor = country.properties.color;
    const name = country.properties.ADMIN;

    const displayText = country.properties[options];

    layer.bindPopup(`${name}${displayText}`);
    layer.on('mouseover', function (e) {
      this.openPopup();
    });
    layer.on('mouseout', function (e) {
        this.closePopup();
    });
    };
  
  return (
    <div>

      <Map style={{ height: "80vh", width: "95%", border: "1px solid black"}} zoom={state.zoom} center={[state.lat, state.lng]}>
      <GeoJSON
        style={mapStyle}
        data={countries}
        onEachFeature={onEachCountry}
      />
       <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        </Map>
    </div>

  );

};

export default WorldMap;
