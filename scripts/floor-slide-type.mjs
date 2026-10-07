/**
 * Second pass: floor remaining sub-16px font sizes to presentation minimums.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src/components/slides");
const SKIP = new Set(["Slide00Cover.tsx"]);

function floorPx(n) {
  if (n < 8) return n;
  if (n < 16) return 18;
  if (n < 18) return 19;
  return n;
}

function fmt(n) {
  return Number.isInteger(n) ? String(n) : String(n);
}

function transform(src) {
  let out = src;
  out = out.replace(
    /fontSize:\s*(["'`])clamp\((\d+(?:\.\d+)?)px,\s*(\d+(?:\.\d+)?)vw,\s*(\d+(?:\.\d+)?)px\)\1/g,
    (m, q, a, b, c) => {
      const na = +a < 18 ? 18 : +a;
      const nc = +c < 22 ? 22 : +c;
      if (na === +a && nc === +c) return m;
      return `fontSize: ${q}clamp(${fmt(na)}px, ${b}vw, ${fmt(nc)}px)${q}`;
    },
  );
  out = out.replace(/fontSize:\s*(\d+(?:\.\d+)?)(?!\s*[a-zA-Z%])/g, (m, n) => {
    const v = floorPx(+n);
    return v === +n ? m : `fontSize: ${fmt(v)}`;
  });
  out = out.replace(
    /fontSize:\s*(["'`])(\d+(?:\.\d+)?)px\1/g,
    (m, q, n) => {
      const v = floorPx(+n);
      return v === +n ? m : `fontSize: ${q}${fmt(v)}px${q}`;
    },
  );
  out = out.replace(/fontSize=\{(\d+(?:\.\d+)?)\}/g, (m, n) => {
    const v = floorPx(+n);
    return v === +n ? m : `fontSize={${fmt(v)}}`;
  });
  return out;
}

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, acc);
    else if (/\.tsx$/.test(name) && !SKIP.has(name)) acc.push(full);
  }
  return acc;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, "utf8");
  const after = transform(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
    console.log("floored", path.relative(process.cwd(), file));
  }
}
console.log(`done: ${changed} files`);
