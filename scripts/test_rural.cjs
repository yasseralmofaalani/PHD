const fs = require('fs');

const { points } = JSON.parse(fs.readFileSync('scripts/syria_path.json', 'utf8'));

function insideSyria(x, y) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i];
    const [xj, yj] = points[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

// Target points covering rural regions across Syria (Hauran, Badia, Euphrates, Jazira, Coastal mountains, Qalamoun, Palmyra):
const candidateTargets = [
  [380, 250], // Central badia / Homs rural
  [420, 300], // Palmyra / Tadmur direction
  [450, 260], // Central east
  [480, 320], // Southern badia
  [520, 230], // Between Raqqa & Deir
  [550, 180], // North of Euphrates
  [590, 160], // South of Hasakah / Khabur
  [610, 220], // East of Deir ez-Zor
  [650, 130], // Jazira countryside
  [600, 90],  // Northern Hasakah
  [430, 150], // East Aleppo / Manbij rural
  [380, 180], // Idlib / Aleppo rural
  [340, 220], // Hama countryside
  [280, 250], // Coastal mountain rural
  [290, 340], // Qalamoun / Rif Dimashq
  [310, 420], // Damascus east rural
  [340, 450], // Suwayda countryside / Jabal al-Arab
  [280, 480], // Daraa rural / Yarmouk basin
  [500, 360], // Deep southern desert
  [560, 290], // Abu Kamal / Al-Bukamal direction
];

candidateTargets.forEach(([x, y], idx) => {
  console.log(`Target ${idx} [${x}, ${y}]:`, insideSyria(x, y) ? "INSIDE ✓" : "OUTSIDE ✗");
});
