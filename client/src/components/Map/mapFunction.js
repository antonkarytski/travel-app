export const colorBoundaries = (map, countryCoordinates, countryName) => {
  map.flyTo({
    center: [4.8896900, 52.3740300],
    zoom: 3
  });

  map.on('load', function() {
    map.addLayer({
      id: "boundaries",
      type: "fill",
      source: {
        type: "geojson",
        data: {
          "type": "FeatureCollection",
          "features": [
            { 
              "type": "Feature", 
              "properties": { 
                "ADMIN": countryName
              }, 
              "geometry": { "type": "MultiPolygon", 
              "coordinates": countryCoordinates
              } 
            }
          ]
        }
      },
      paint: {
        "fill-color": "#ffc617",
        "fill-outline-color": "#000000",
        "fill-opacity": 0.2
      }
    });
  })
}