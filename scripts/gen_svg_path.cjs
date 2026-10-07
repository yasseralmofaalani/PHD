const fs = require('fs');

const data = JSON.parse(fs.readFileSync('syria.geojson', 'utf8'));

// Douglas-Peucker simplification
function perpendicularDistance(point, lineStart, lineEnd) {
  let dx = lineEnd[0] - lineStart[0];
  let dy = lineEnd[1] - lineStart[1];
  const mag = Math.hypot(dx, dy);
  if (mag > 0) {
    dx /= mag;
    dy /= mag;
  }
  const pvx = point[0] - lineStart[0];
  const pvy = point[1] - lineStart[1];
  const pvdot = pvx * dx + pvy * dy;
  const dsx = pvdot * dx;
  const dsy = pvdot * dy;
  const ax = pvx - dsx;
  const ay = pvy - dsy;
  return Math.hypot(ax, ay);
}

function douglasPeucker(points, epsilon) {
  if (points.length <= 2) return points;
  let dmax = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDistance(points[i], points[0], points[points.length - 1]);
    if (d > dmax) {
      index = i;
      dmax = d;
    }
  }
  if (dmax > epsilon) {
    const rec1 = douglasPeucker(points.slice(0, index + 1), epsilon);
    const rec2 = douglasPeucker(points.slice(index), epsilon);
    return rec1.slice(0, rec1.length - 1).concat(rec2);
  } else {
    return [points[0], points[points.length - 1]];
  }
}

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

const targetH = 460;
const scale = targetH / (maxY - minY);
const targetW = (maxX - minX) * scale;
const offsetX = 490 - targetW / 2;
const offsetY = 272 - targetH / 2;

// Simplify mainland ring with epsilon = 0.6px (gives ~280-320 clean, sharp, recognizable points)
const mainlandRing = geom.coordinates[0][0];
const projectedMain = mainlandRing.map(([lon, lat]) => {
  const [mx, my] = toMercator(lon, lat);
  const sx = Number(((mx - minX) * scale + offsetX).toFixed(1));
  const sy = Number(((maxY - my) * scale + offsetY).toFixed(1));
  return [sx, sy];
});

const simplified = douglasPeucker(projectedMain, 0.6);
console.log(`Simplified mainland points: ${simplified.length}`);

// Generate SVG path string
let d = `M ${simplified[0][0]} ${simplified[0][1]}`;
for (let i = 1; i < simplified.length; i++) {
  d += ` L ${simplified[i][0]} ${simplified[i][1]}`;
}
d += " Z";

console.log("Path string length:", d.length);

// Also generate test SVG
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 520" width="1000" height="520" style="background:#edebe0">
  <path d="${d}" fill="rgba(66,129,119,0.12)" stroke="#428177" stroke-width="2" stroke-linejoin="round" />
  ${[
    { name: "دمشق", x: 286, y: 395 },
    { name: "حلب", x: 351, y: 147 },
    { name: "حمص", x: 318, y: 283 },
    { name: "اللاذقية", x: 248, y: 210 },
    { name: "دير الزور", x: 576, y: 228 },
    { name: "الحسكة", x: 622, y: 119 },
    { name: "درعا", x: 272, y: 475 }
  ].map(c => `
    <circle cx="${c.x}" cy="${c.y}" r="4" fill="#6b1f2a" />
    <text x="${c.x}" y="${c.y - 8}" text-anchor="middle" font-family="Cairo, sans-serif" font-size="12" font-weight="bold" fill="#0f172a">${c.name}</text>
  `).join("")}
</svg>`;

fs.writeFileSync("scripts/syria_test.svg", svg, "utf8");
fs.writeFileSync("scripts/syria_path.json", JSON.stringify({ d, points: simplified }), "utf8");
console.log("Wrote scripts/syria_test.svg and scripts/syria_path.json");
