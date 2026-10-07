/**
 * One-shot scaler: enlarge fontSize values in slide/UI files
 * so the deck matches presentation-grade cover typography.
 * Does not change wording. Skips Slide00Cover (already rebuilt).
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src");
const SKIP = new Set(["Slide00Cover.tsx"]);

function scalePx(n) {
  if (n < 8) return n;
  if (n <= 10) return Math.round(n * 1.5 * 10) / 10;
  if (n <= 12) return Math.round(n * 1.42 * 10) / 10;
  if (n <= 14) return Math.round(n * 1.38 * 10) / 10;
  if (n <= 16) return Math.round(n * 1.32 * 10) / 10;
  if (n <= 18) return Math.round(n * 1.28 * 10) / 10;
  if (n <= 22) return Math.round(n * 1.24 * 10) / 10;
  if (n <= 28) return Math.round(n * 1.2 * 10) / 10;
  if (n <= 36) return Math.round(n * 1.18 * 10) / 10;
  if (n <= 50) return Math.round(n * 1.12 * 10) / 10;
  return n;
}

function scaleVw(n) {
  return Math.round(n * 1.22 * 100) / 100;
}

function fmt(n) {
  return Number.isInteger(n) ? String(n) : String(n);
}

function transform(src) {
  let out = src;

  // fontSize: "clamp(A px, B vw, C px)"
  out = out.replace(
    /fontSize:\s*(["'`])clamp\((\d+(?:\.\d+)?)px,\s*(\d+(?:\.\d+)?)vw,\s*(\d+(?:\.\d+)?)px\)\1/g,
    (_, q, a, b, c) =>
      `fontSize: ${q}clamp(${fmt(scalePx(+a))}px, ${scaleVw(+b)}vw, ${fmt(scalePx(+c))}px)${q}`,
  );

  // font-size: clamp(...) in CSS
  out = out.replace(
    /font-size:\s*clamp\((\d+(?:\.\d+)?)px,\s*(\d+(?:\.\d+)?)vw,\s*(\d+(?:\.\d+)?)px\)/g,
    (_, a, b, c) =>
      `font-size: clamp(${fmt(scalePx(+a))}px, ${scaleVw(+b)}vw, ${fmt(scalePx(+c))}px)`,
  );

  // fontSize: N or fontSize: N (no unit, JS number)
  out = out.replace(/fontSize:\s*(\d+(?:\.\d+)?)(?!\s*[a-zA-Z%])/g, (_, n) => {
    return `fontSize: ${fmt(scalePx(+n))}`;
  });

  // fontSize: "Npx" / 'Npx'
  out = out.replace(
    /fontSize:\s*(["'`])(\d+(?:\.\d+)?)px\1/g,
    (_, q, n) => `fontSize: ${q}${fmt(scalePx(+n))}px${q}`,
  );

  // SVG / JSX fontSize={N} or fontSize="N"
  out = out.replace(/fontSize=\{(\d+(?:\.\d+)?)\}/g, (_, n) => `fontSize={${fmt(scalePx(+n))}}`);
  out = out.replace(
    /fontSize=(["'`])(\d+(?:\.\d+)?)\1/g,
    (_, q, n) => `fontSize=${q}${fmt(scalePx(+n))}${q}`,
  );

  return out;
}

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === "node_modules") continue;
      walk(full, acc);
    } else if (/\.(tsx|ts|css)$/.test(name) && !SKIP.has(name)) {
      acc.push(full);
    }
  }
  return acc;
}

const files = [
  ...walk(path.join(ROOT, "components", "slides")),
  ...walk(path.join(ROOT, "components", "design")),
  path.join(ROOT, "components", "ui", "SectionMarker.tsx"),
];

let changed = 0;
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, "utf8");
  const after = transform(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
    console.log("updated", path.relative(process.cwd(), file));
  }
}
console.log(`done: ${changed} files`);
