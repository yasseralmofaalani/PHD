const fs = require('fs');

const data = JSON.parse(fs.readFileSync('syria.geojson', 'utf8'));

// Real coordinates of Syrian cities:
const realCities = [
  { id: "damascus", name: "دمشق", lon: 36.2913, lat: 33.5102 },
  { id: "aleppo",   name: "حلب",  lon: 37.1612, lat: 36.2012 },
  { id: "homs",     name: "حمص",  lon: 36.7233, lat: 34.7308 },
  { id: "hama",     name: "حماة", lon: 36.7578, lat: 35.1318 },
  { id: "latakia",  name: "اللاذقية", lon: 35.7918, lat: 35.5317 },
  { id: "tartus",   name: "طرطوس",    lon: 35.8866, lat: 34.8959 },
  { id: "idlib",    name: "إدلب",     lon: 36.6349, lat: 35.9306 },
  { id: "daraa",    name: "درعا",     lon: 36.1042, lat: 32.6184 },
  { id: "suwayda",  name: "السويداء", lon: 36.5662, lat: 32.7090 },
  { id: "quneitra", name: "القنيطرة", lon: 35.8247, lat: 33.1261 },
  { id: "raqqa",    name: "الرقة",     lon: 39.0089, lat: 35.9594 },
  { id: "deir",     name: "دير الزور", lon: 40.1408, lat: 35.3359 },
  { id: "hasakah",  name: "الحسكة",   lon: 40.7479, lat: 36.5024 },
];

// Let's compute the bounding box of syria.geojson in Mercator:
function toMercator(lon, lat) {
  const x = lon * (Math.PI / 180);
  const latRad = lat * (Math.PI / 180);
  const y = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  return [x, y];
}

let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;

const geom = data.features[0].geometry;
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

console.log("Mercator bbox:");
console.log("X:", minX, "to", maxX, "range:", maxX - minX);
console.log("Y:", minY, "to", maxY, "range:", maxY - minY);

// We want to map [minX, maxX] and [minY, maxY] into an SVG viewBox!
// Note: In SVG, y increases downwards, whereas in Mercator, y increases upwards (North).
// So svgY = (maxY - y) * scale + offsetY
// svgX = (x - minX) * scale + offsetX

// What should the SVG viewBox be?
// Currently the slides use viewBox="80 30 820 490" or viewBox="0 0 1000 520".
// Let's see: available width ~800, available height ~480.
// If Syria's aspect ratio W/H is 1.11:
// If height = 460, then width = 460 * 1.11 = 510!
// Or if width = 600, height = 600 / 1.11 = 540 (a bit tall for 520).
// In a 1000 x 520 canvas:
// If height fits with padding, say H = 450, then W = 450 * 1.1105 = 500.
// Center horizontally in 1000: offsetX = (1000 - 500) / 2 = 250!
// offsetY = (520 - 450) / 2 = 35!
// Or if viewBox="80 30 820 490": center in 80..900: W=520, H=468, etc.

const targetH = 460;
const scale = targetH / (maxY - minY);
const targetW = (maxX - minX) * scale;
const offsetX = (1000 - targetW) / 2;
const offsetY = (520 - targetH) / 2;

console.log(`targetW=${targetW.toFixed(1)}, targetH=${targetH.toFixed(1)}, offsetX=${offsetX.toFixed(1)}, offsetY=${offsetY.toFixed(1)}`);

realCities.forEach(c => {
  const [mx, my] = toMercator(c.lon, c.lat);
  const sx = (mx - minX) * scale + offsetX;
  const sy = (maxY - my) * scale + offsetY;
  console.log(`${c.name.padEnd(10)}: svgX=${sx.toFixed(1)}, svgY=${sy.toFixed(1)}`);
});
