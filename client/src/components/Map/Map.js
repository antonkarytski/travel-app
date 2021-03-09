import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
// import {drawRoute} from "./routeFunction";
import './Map.css';

export class Map extends Component {
  map = null;
  mapContainer = React.createRef();


  componentDidMount() {
    mapboxgl.accessToken = "pk.eyJ1Ijoic2Fmd29vZCIsImEiOiJja20wemV3djgxeDFwMnZtdzNlcmRmbnNqIn0.X8mmN1JOEEHQjSZ0I8_ChA";
    this.map = new mapboxgl.Map ({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [37.6156, 55.7522],
      zoom: 10,
    })

  }

  // componentDidUpdate() {

  //   if (this.map.getLayer("route")) {
  //     this.map.removeLayer("route");
  //   }

  //   if (this.map.getSource("route")) {
  //     this.map.removeSource("route");
  //   }

  //   // if (this.props.route) {
  //   //   drawRoute(this.map, this.props.route);
  //   // }
  // }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
     <div>
        <div className="Map-wrapper">
          <div className="Map" ref={this.mapContainer}></div>
          <div>Карта</div> 
        </div>
     </div>
    )
  }
}

export default Map;