import React, {useRef, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';
//import {colorBoundaries} from "./mapFunction";
//import './Map.css';


const Map = () => {
    const mapContainer = useRef();

    useEffect(() => {
        const coordinates = [4.8896900, 52.3740300];
        const city = "Амстердам"

        mapboxgl.accessToken = "pk.eyJ1Ijoic2Fmd29vZCIsImEiOiJja20wemV3djgxeDFwMnZtdzNlcmRmbnNqIn0.X8mmN1JOEEHQjSZ0I8_ChA";
        const map = new mapboxgl.Map ({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/outdoors-v11",
            center: coordinates,
            zoom: 3,
        })

        const nav = new mapboxgl.NavigationControl({
            showCompass: true,
            showZoom: true
        })

        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<h3>${city}</h3>`))
            .addTo(map)

        map.addControl(nav, 'bottom-right');
        //colorBoundaries(this.map)

        return () => {
            map.remove();
        }

    }, [])


        return (
            <div className="Мap-container">
                <div className="Map-wrapper">
                    <div className="Map" ref={mapContainer} />

                    <div>Карта</div>
                </div>
            </div>
        )
}
export default Map;