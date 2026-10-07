const fs = require('fs');

const data = JSON.parse(fs.readFileSync('syria.geojson', 'utf8'));

// Project coordinates using Web Mercator (or conformal projection at center lat 35)
function project([lon, lat]) {
  // Web Mercator formula:
  const x = lon * (Math.PI / 180);
  const latRad = lat * (Math.PI / 180);
  const y = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  return [x, y];
}

// Or Equirectangular with standard parallel 34.8°:
function projectEqui([lon, lat]) {
  const cosLat0 = Math.cos(34.81588 * Math.PI / 180); // ~0.821
  const x = lon * cosLat0;
  const y = lat;
  return [x, y];
}

console.log("Testing projections...");

const geom = data.features[0].geometry;

for (const [name, projFn] of [['Mercator', project], ['Equirectangular', projectEqui]]) {
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  geom.coordinates.forEach(poly => {
    poly.forEach(ring => {
      ring.forEach(pt => {
        const [px, py] = projFn(pt);
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
      });
    });
  });
  
  const w = maxX - minX;
  const h = maxY - minY;
  console.log(`${name}: W=${w.toFixed(5)}, H=${h.toFixed(5)}, W/H ratio=${(w/h).toFixed(3)}`);
}
