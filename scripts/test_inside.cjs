const fs = require('fs');

const { d, points } = JSON.parse(fs.readFileSync('scripts/syria_path.json', 'utf8'));

function insideSyria(x, y) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i];
    const [xj, yj] = points[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

const cities = [
  { id: "damascus", name: "دمشق", x: 286, y: 395 },
  { id: "aleppo", name: "حلب", x: 351, y: 147 },
  { id: "homs", name: "حمص", x: 318, y: 283 },
  { id: "hama", name: "حماة", x: 321, y: 247 },
  { id: "latakia", name: "اللاذقية", x: 252, y: 210 },
  { id: "tartus", name: "طرطوس", x: 259, y: 268 },
  { id: "idlib", name: "إدلب", x: 312, y: 173 },
  { id: "daraa", name: "درعا", x: 272, y: 475 },
  { id: "suwayda", name: "السويداء", x: 306, y: 467 },
  { id: "quneitra", name: "القنيطرة", x: 250, y: 429 },
  { id: "raqqa", name: "الرقة", x: 491, y: 170 },
  { id: "deir", name: "دير الزور", x: 576, y: 228 },
  { id: "hasakah", name: "الحسكة", x: 622, y: 119 },
];

console.log("Testing cities inside polygon:");
cities.forEach(c => {
  const ins = insideSyria(c.x, c.y);
  console.log(`${c.name.padEnd(10)} (${c.x}, ${c.y}): ${ins ? "INSIDE ✓" : "OUTSIDE ✗"}`);
});

// Test points outside:
console.log("Sea (150, 250):", insideSyria(150, 250) ? "FAIL" : "OUTSIDE ✓");
console.log("Turkey (350, 50):", insideSyria(350, 50) ? "FAIL" : "OUTSIDE ✓");
console.log("Jordan (270, 510):", insideSyria(270, 510) ? "FAIL" : "OUTSIDE ✓");
console.log("Iraq (700, 350):", insideSyria(700, 350) ? "FAIL" : "OUTSIDE ✓");
