const cities = [
  { id: "damascus", name: "دمشق", lon: 36.2765, lat: 33.5138, svgX: 201, svgY: 387 },
  { id: "aleppo",   name: "حلب",  lon: 37.1343, lat: 36.2021, svgX: 314, svgY: 154 },
  { id: "homs",     name: "حمص",  lon: 36.7137, lat: 34.7324, svgX: 255, svgY: 281 },
  { id: "latakia",  name: "اللاذقية", lon: 35.7918, lat: 35.5317, svgX: 140, svgY: 213 },
  { id: "daraa",    name: "درعا", lon: 36.1042, lat: 32.6184, svgX: 178, svgY: 458 },
  { id: "raqqa",    name: "الرقة", lon: 39.0089, lat: 35.9594, svgX: 553, svgY: 175 },
  { id: "deir",     name: "دير الزور", lon: 40.1408, lat: 35.3359, svgX: 699, svgY: 228 },
  { id: "hasakah",  name: "الحسكة", lon: 40.7479, lat: 36.5024, svgX: 778, svgY: 128 },
];

console.log("Analyzing scale factors:");
cities.forEach(c => {
  console.log(`${c.name}: lon=${c.lon}, lat=${c.lat} -> svgX=${c.svgX}, svgY=${c.svgY}`);
});

// Let's fit affine transform: svgX = a*lon + b*lat + c, svgY = d*lon + e*lat + f
// Or standard GIS projection (e.g. Mercator or equirectangular):
// svgX = s_x * (lon - minLon) + x0
// svgY = s_y * (maxLat - lat) + y0
const dLon = cities[cities.length-1].lon - cities[3].lon; // hasakah - latakia
const dX = cities[cities.length-1].svgX - cities[3].svgX;
console.log("dX / dLon =", dX / dLon);

const dLat = cities[1].lat - cities[4].lat; // aleppo - daraa
const dY = cities[4].svgY - cities[1].svgY;
console.log("dY / dLat =", dY / dLat);
