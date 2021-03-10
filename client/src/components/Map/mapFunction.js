import Countries from "./countries.json"

export const colorBoundaries = (map) => {
  const coordinates = Countries.features[168].geometry.coordinates;
  const country = Countries.features[168].properties.ADMIN;

  map.flyTo({
    center: [4.8896900, 52.3740300],
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