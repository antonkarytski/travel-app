import Countries from "./countries.json"

export const colorBoundaries = (map) => {
  const coordinates = Countries.features[1].geometry.coordinates;
  const country = Countries.features[1].properties.ADMIN;

  map.flyTo({
    center: coordinates[0][0][0],
    zoom: 3
  });

  map.on('load', function() {
    map.addLayer({
        id: "lang",
        type: "fill",
        source: {
          type: "geojson",
          data: {
            "type": "FeatureCollection",
            
            "features": [
            { "type": "Feature", 
            "properties": { 
              "ADMIN": country
            }, 
            "geometry": { "type": "MultiPolygon", 
              "coordinates": coordinates
         } }
            ]
            }
        },
        paint: {
          "fill-color": "#ffc617",
          "fill-outline-color": "#000000",
          "fill-opacity": 0.3
        }
    });
  })
}