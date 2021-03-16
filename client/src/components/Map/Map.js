import mapboxgl from 'mapbox-gl';
import {colorBoundaries} from "./mapFunction";
import './Map.css';
import React, {useRef, useEffect, useContext} from 'react';
import {AppContext} from "../../context/AppContext";

const Map = ({countryCode, countries, capitals, className, mapClassName}) => {
  const mapContainer = useRef();
  let capitalCoordinates;
  let countryName;
  let countryCoordinates;
  const {language} = useContext(AppContext)

  const getCountriesCoordinates = () => {
    countries.features.find(country => {
      if(country.properties.ISO_A2 === countryCode) {
        countryCoordinates = country.geometry.coordinates;
      }
    })
  }

  const getCapitalCoordinates = () => {
    capitals.find(country => {
      if(country.CountryCode === countryCode) {
        capitalCoordinates = [country.CapitalLongitude, country.CapitalLatitude]; //longitude , lattitude
        countryName = country.CountryName;
      }
    })
  }

  useEffect(() => {
    getCountriesCoordinates()
    getCapitalCoordinates()

    mapboxgl.accessToken = "pk.eyJ1Ijoic2Fmd29vZCIsImEiOiJja20wemV3djgxeDFwMnZtdzNlcmRmbnNqIn0.X8mmN1JOEEHQjSZ0I8_ChA";
    const map = new mapboxgl.Map ({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: capitalCoordinates || countryCoordinates[0][0][0],
      zoom: 4
    })

    const nav = new mapboxgl.NavigationControl({
      showCompass: true,
      showZoom: true
    })

    const el = document.createElement('div');
    el.className = 'marker';

    if(capitalCoordinates) {
      new mapboxgl.Marker(el) 
      .setLngLat(capitalCoordinates)
      .addTo(map)
    }
    
    map.addControl(nav, 'bottom-right');
    map.addControl(new mapboxgl.FullscreenControl());
  
    map.on('load', function() {
      map.setLayoutProperty('country-label', 'text-field', ['get', 'name_' + language.toLocaleLowerCase()])
    })
    
    colorBoundaries(map, countryCoordinates, countryName, capitalCoordinates)

    return () => {
      map.remove();
    }
  }, [language])

  return (
      <div className={["Map-wrapper", className].join(" ")}>
        <div className={["Map", mapClassName].join(" ")} ref={mapContainer} />
      </div>
  )
}

export default Map;

