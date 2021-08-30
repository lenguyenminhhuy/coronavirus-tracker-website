import React, {useEffect} from "react";
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

  const onDeaths = (country, layer) => {
    let name = country.properties.ADMIN
    layer.options.fillColor = country.properties.color;
    let displayText = country.properties['total_deaths'];   

    layer.bindPopup(`${name}${displayText}`);
    layer.on('mouseover', function (e) {
      this.openPopup();
    });
    layer.on("mouseout", function (e) {
      this.closePopup();
    });
  };


  
  const onVaccinated = (country, layer) => {
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


  useEffect(() => {
    console.log(options);
    console.log(countries);
  },[options])

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
  }

  return (
    <div>

      <Map style={{ height: "80vh", width: "100%", border: "1px solid black"}} zoom={state.zoom} center={[state.lat, state.lng]}>
      {/* {options == 'total_cases' ?
              <GeoJSON
              key="test"
              style={mapStyle}
              data={countries}
              onEachFeature={onEachCountry2}
            />
            :
            <GeoJSON
            key="shit"
            style={mapStyle}
            data={countries}
            onEachFeature={onEachCountry}
          />
      } */}
       <GeoJSON
            key={options}
            style={mapStyle}
            data={countries}
            onEachFeature={switchCase(options)}/>
       <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        </Map>
    </div>

  );

};

export default WorldMap;
