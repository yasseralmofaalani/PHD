const fs = require('fs');
const data = JSON.parse(fs.readFileSync('syria.geojson', 'utf8'));

const geom = data.features[0].geometry;
console.log('Geometry Type:', geom.type);
console.log('Polygon count:', geom.coordinates.length);

let minLon = Infinity, maxLon = -Infinity;
let minLat = Infinity, maxLat = -Infinity;
let totalPoints = 0;

geom.coordinates.forEach((poly, pIdx) => {
  console.log(`Polygon ${pIdx} rings:`, poly.length, 'Exterior ring points:', poly[0].length);
  poly.forEach(ring => {
    totalPoints += ring.length;
    ring.forEach(([lon, lat]) => {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    });
  });
});

console.log('Total points:', totalPoints);
console.log(`Bounding Box: Lon [${minLon}, ${maxLon}], Lat [${minLat}, ${maxLat}]`);
