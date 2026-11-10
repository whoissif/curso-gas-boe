import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(pathToFileURL(path.join(root, "index.html")).href);
await page.waitForTimeout(1600);

const audit = await page.evaluate(() => {
  const box = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { w: Math.round(r.width), h: Math.round(r.height) };
  };
  const out = {};
  [".hero", ".kpis", "#rank-list", "#scatter svg", "#flow svg", "#crossover svg", "#donut svg", "#offer-table", ".hz"].forEach((s) => (out[s] = box(s)));
  out.kpiHeights = [...document.querySelectorAll(".kpi")].map((e) => Math.round(e.getBoundingClientRect().height));
  out.barWidths = [...document.querySelectorAll("#rank-list .bar-seg")].map((e) => Math.round(e.getBoundingClientRect().width));
  out.docHeight = document.documentElement.scrollHeight;
  out.overflow = [...document.querySelectorAll("body *")]
    .filter((e) => {
      const r = e.getBoundingClientRect();
      return r.right > window.innerWidth + 1 && getComputedStyle(e).position !== "fixed";
    })
    .slice(0, 8)
    .map((e) => e.tagName + "." + (e.className && e.className.baseVal === undefined ? e.className : "svg") + " right=" + Math.round(e.getBoundingClientRect().right));
  return out;
});

console.log(JSON.stringify(audit, null, 2));
await browser.close();
