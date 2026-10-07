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

const CITIES = [
  { id: "damascus", name: "دمشق", x: 286, y: 395, w: 1 },
  { id: "aleppo", name: "حلب", x: 351, y: 147, w: 0.9 },
  { id: "homs", name: "حمص", x: 318, y: 283, w: 0.6 },
  { id: "hama", name: "حماة", x: 321, y: 247, w: 0.45 },
  { id: "latakia", name: "اللاذقية", x: 252, y: 210, w: 0.5 },
  { id: "tartus", name: "طرطوس", x: 259, y: 268, w: 0.35 },
  { id: "idlib", name: "إدلب", x: 312, y: 173, w: 0.35 },
  { id: "daraa", name: "درعا", x: 272, y: 475, w: 0.3 },
  { id: "suwayda", name: "السويداء", x: 306, y: 467, w: 0.25 },
  { id: "quneitra", name: "القنيطرة", x: 250, y: 429, w: 0.2 },
  { id: "raqqa", name: "الرقة", x: 491, y: 170, w: 0.3 },
  { id: "deir", name: "دير الزور", x: 576, y: 228, w: 0.35 },
  { id: "hasakah", name: "الحسكة", x: 622, y: 119, w: 0.35 },
];

const rng = (seed) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

function makeSites(count, seed = 7, urbanShare = 0.62) {
  const r = rng(seed);
  const out = [];
  let guard = 0;
  const t0 = Date.now();
  while (out.length < count && guard < count * 40) {
    guard++;
    const urban = r() < urbanShare;
    let x;
    let y;
    let region;
    if (urban) {
      const pick = r() * CITIES.reduce((a, c) => a + c.w, 0);
      let acc = 0;
      let ci = 0;
      for (let k = 0; k < CITIES.length; k++) {
        acc += CITIES[k].w;
        if (pick <= acc) {
          ci = k;
          break;
        }
      }
      const c = CITIES[ci];
      const rad = 6 + r() * 22;
      const a = r() * Math.PI * 2;
      x = c.x + Math.cos(a) * rad;
      y = c.y + Math.sin(a) * rad * 0.8;
      region = ci;
    } else {
      x = 236 + r() * 508;
      y = 44 + r() * 456;
      let best = 0;
      let bd = Infinity;
      CITIES.forEach((c, k) => {
        const d = (c.x - x) ** 2 + (c.y - y) ** 2;
        if (d < bd) {
          bd = d;
          best = k;
        }
      });
      region = best;
    }
    if (insideSyria(x, y)) out.push({ x, y, urban, region });
  }
  console.log(`Generated ${out.length} sites in ${Date.now() - t0}ms (guard=${guard})`);
  return out;
}

const s1 = makeSites(900, 11);
const s2 = makeSites(700, 23);
const s3 = makeSites(260, 77);
