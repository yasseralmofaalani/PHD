const fs = require('fs');

const { d } = JSON.parse(fs.readFileSync('scripts/syria_path.json', 'utf8'));

let kitContent = fs.readFileSync('src/components/slides/contributions/kit.tsx', 'utf8');

// 1. Replace SYRIA_OUTLINE
const outlineRegex = /export const SYRIA_OUTLINE =\s*"[^"]+";/;
if (!outlineRegex.test(kitContent)) {
  console.error("SYRIA_OUTLINE regex didn't match!");
  process.exit(1);
}
kitContent = kitContent.replace(outlineRegex, `export const SYRIA_OUTLINE =\n  "${d}";`);

// 2. Replace CITIES
const citiesBlock = `export const CITIES = [
  { id: "damascus", name: "دمشق", x: 286, y: 395, w: 1 },
  { id: "aleppo", name: "حلب", x: 351, y: 147, w: 0.9 },
  { id: "homs", name: "حمص", x: 318, y: 283, w: 0.6 },
  { id: "hama", name: "حماة", x: 321, y: 247, w: 0.45 },
  { id: "latakia", name: "اللاذقية", x: 252, y: 210, w: 0.5 },
  { id: "tartus", name: "طرطوس", x: 259, y: 268, w: 0.35 },
  { id: "idlib", name: "إدلب", x: 312, y: 173, w: 0.35 },
  { id: "daraa", name: "درعا", x: 272, y: 475, w: 0.3 },
  { id: "suwayda", name: "السويداء", x: 306, y: 467, w: 0.25 },
  { id: "raqqa", name: "الرقة", x: 491, y: 170, w: 0.3 },
  { id: "deir", name: "دير الزور", x: 576, y: 228, w: 0.35 },
  { id: "hasakah", name: "الحسكة", x: 622, y: 119, w: 0.35 },
] as const;`;

const citiesRegex = /export const CITIES = \[\s*[\s\S]*?\] as const;/;
if (!citiesRegex.test(kitContent)) {
  console.error("CITIES regex didn't match!");
  process.exit(1);
}
kitContent = kitContent.replace(citiesRegex, citiesBlock);

// 3. Replace bounds in makeSites
kitContent = kitContent.replace(/x = 110 \+ r\(\) \* 760;/, "x = 236 + r() * 508;");
kitContent = kitContent.replace(/y = 60 \+ r\(\) \* 440;/, "y = 44 + r() * 456;");
kitContent = kitContent.replace(/const rad = 8 \+ r\(\) \* 26;/, "const rad = 6 + r() * 20;");

fs.writeFileSync('src/components/slides/contributions/kit.tsx', kitContent, 'utf8');
console.log("Successfully updated kit.tsx!");
