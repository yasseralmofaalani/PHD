const fs = require('fs');

const raw = fs.readFileSync('syria.geojson', 'utf8');
const data = JSON.parse(raw);

console.log('Type:', data.type);
if (data.features) {
  console.log('Number of features:', data.features.length);
  data.features.forEach((f, idx) => {
    console.log(`Feature ${idx}:`, f.geometry.type, f.properties);
  });
} else if (data.geometry) {
  console.log('Single geometry:', data.geometry.type);
} else if (data.coordinates) {
  console.log('Direct coords');
}
