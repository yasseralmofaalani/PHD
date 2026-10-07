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

// Mercator projection
function toMercator(lon, lat) {
  const x = lon * (Math.PI / 180);
  const latRad = lat * (Math.PI / 180);
  const y = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  return [x, y];
}

const geom = data.features[0].geometry;
// Main ring of Polygon 0 (mainland Syria)
const mainRing = geom.coordinates[0][0];

// Let's get bbox of all coords
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

console.log("Original points in main ring:", mainRing.length);

// Let's fit to 1000 x 520 canvas:
// The slides have a viewBox="80 30 820 490" or "0 0 1000 520".
// Notice the width of the canvas is ~800, height is ~480.
// If we center Syria within viewBox="0 0 1000 520":
// Available height ~ 470 (e.g. from y=25 to y=495).
// Syria width in pixels = 470 * 1.1105 = 522 px.
// Centered in 1000: x from (1000 - 522)/2 = 239 to 761!
// Wait! Let's check: in the slides, the left side (x=80..239) and right side:
// Is there text or controls on the left/right in any slides?
// Let's check slide 20 in the user's screenshot:
// In the user's screenshot, the title is at the top right ("01 المساهمة الأولى - محرك التحسين الذكي / لماذا نحتاج إلى التحسين؟").
// The top left has the beat pill ("1/4 شبكة ضخمة").
// The map is centered in the main slide area!

const targetH = 465;
const scale = targetH / (maxY - minY);
const targetW = (maxX - minX) * scale;
const offsetX = (1000 - targetW) / 2;
const offsetY = (520 - targetH) / 2;

console.log(`targetW=${targetW}, targetH=${targetH}, offsetX=${offsetX}, offsetY=${offsetY}`);

// Project main ring to SVG coords
const svgPoints = mainRing.map(([lon, lat]) => {
  const [mx, my] = toMercator(lon, lat);
  const sx = (mx - minX) * scale + offsetX;
  const sy = (maxY - my) * scale + offsetY;
  return [sx, sy];
});

for (const eps of [0.3, 0.5, 0.8, 1.0, 1.5, 2.0]) {
  const simplified = douglasPeucker(svgPoints, eps);
  console.log(`Epsilon=${eps}: ${simplified.length} points`);
}
