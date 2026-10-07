const fs = require('fs');

const data = JSON.parse(fs.readFileSync('syria.geojson', 'utf8'));

function toMercator(lon, lat) {
  const x = lon * (Math.PI / 180);
  const latRad = lat * (Math.PI / 180);
  const y = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  return [x, y];
}

const geom = data.features[0].geometry;
let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;

geom.coordinates.forEach(poly => {
  poly.forEach(ring => {
    ring.forEach(([lon, lat]) => {
      const [x, y] = toMercator(lon, lat);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    });
  });
});

// Center in the SVG canvas
// Target height = 460
const targetH = 460;
const scale = targetH / (maxY - minY);
const targetW = (maxX - minX) * scale;

// Center around cx = 490, cy = 272 (fits both 0..1000 and 80..900)
const offsetX = 490 - targetW / 2;
const offsetY = 272 - targetH / 2;

console.log(`Bounds in SVG: X [${offsetX.toFixed(1)}, ${(offsetX + targetW).toFixed(1)}], Y [${offsetY.toFixed(1)}, ${(offsetY + targetH).toFixed(1)}]`);

const realCities = [
  { id: "damascus", name: "دمشق",     lon: 36.2913, lat: 33.5102, w: 1 },
  { id: "aleppo",   name: "حلب",      lon: 37.1612, lat: 36.2012, w: 0.9 },
  { id: "homs",     name: "حمص",      lon: 36.7233, lat: 34.7308, w: 0.6 },
  { id: "hama",     name: "حماة",     lon: 36.7578, lat: 35.1318, w: 0.45 },
  { id: "latakia",  name: "اللاذقية", lon: 35.7918, lat: 35.5317, w: 0.5 },
  { id: "tartus",   name: "طرطوس",    lon: 35.8866, lat: 34.8959, w: 0.35 },
  { id: "idlib",    name: "إدلب",     lon: 36.6349, lat: 35.9306, w: 0.35 },
  { id: "daraa",    name: "درعا",     lon: 36.1042, lat: 32.6184, w: 0.3 },
  { id: "suwayda",  name: "السويداء", lon: 36.5662, lat: 32.7090, w: 0.25 },
  { id: "quneitra", name: "القنيطرة", lon: 35.8247, lat: 33.1261, w: 0.2 },
  { id: "raqqa",    name: "الرقة",     lon: 39.0089, lat: 35.9594, w: 0.3 },
  { id: "deir",     name: "دير الزور", lon: 40.1408, lat: 35.3359, w: 0.35 },
  { id: "hasakah",  name: "الحسكة",   lon: 40.7479, lat: 36.5024, w: 0.35 },
];

console.log("\nProjected Cities:");
realCities.forEach(c => {
  const [mx, my] = toMercator(c.lon, c.lat);
  const sx = Math.round((mx - minX) * scale + offsetX);
  const sy = Math.round((maxY - my) * scale + offsetY);
  console.log(`  { id: "${c.id}", name: "${c.name}", x: ${sx}, y: ${sy}, w: ${c.w} },`);
});
