import { chromium } from "playwright-core";
import fs from "node:fs";

const out = "C:/Users/hasan/.gemini/antigravity/brain/0bd0a6b5-d046-49fb-895a-83c287bc33e8/scratch/shots";
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({  });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const slides = [54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66];
const clicks = { 55: 3, 56: 4, 57: 3, 58: 3, 62: 4, 63: 4, 64: 4 };
for (const i of slides) {
  await page.goto(`http://localhost:5199/#slide=${i}`);
  await page.reload();
  await page.waitForTimeout(1800);
  const n = clicks[i] ?? 0;
  for (let k = 0; k < n; k++) {
    await page.mouse.click(800, 450);
    await page.waitForTimeout(700);
    if (n >= 3 && (k === 1) ) await page.screenshot({ path: `${out}/s${i}_mid.png` });
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}/s${i}.png` });
}
await browser.close();
console.log("ok");
