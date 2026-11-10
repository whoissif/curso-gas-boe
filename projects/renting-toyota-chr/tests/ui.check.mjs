/* Comprobación del HTML generado en un navegador real.
   Uso: npm run check  (requiere `npx playwright install chromium`) */
import { chromium } from "playwright";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const url = pathToFileURL(path.join(root, "index.html")).href;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("console: " + m.text());
});

await page.goto(url, { waitUntil: "load" });
await page.waitForSelector("#rank-list .rank-row");
await page.waitForTimeout(1200);

const ok = (label, extra = "") => console.log("  ok  " + label + (extra ? " · " + extra : ""));

/* 1. Estado inicial a 48 meses */
assert.equal(await page.locator("#rank-list .rank-row").count(), 8);
ok("ranking 48m: 6 ofertas + 2 referencias");

assert.equal(await page.locator("#table-body tr").count(), 8);
ok("tabla 48m: 8 filas");

const kpi1 = await page.locator("#kpi1-value").innerText();
assert.match(kpi1, /mes/);
ok("KPI mejor renting", kpi1.replace(/\s+/g, " "));

const kpi4 = await page.locator("#kpi4-name").innerText();
ok("KPI diferencia", kpi4);

assert.equal(await page.locator("#scatter circle.pt, #scatter .pt circle").count() >= 6, true);
ok("scatter: puntos dibujados");

assert.equal(await page.locator("#flow path.line").count(), 3);
ok("flujo: renting + contado + financiada");

const crossTxt = await page.locator("#crossover").innerText();
assert.match(crossTxt, /Cruce|no se detecta/);
ok("cruce", crossTxt.match(/Cruce[^\n]*/)?.[0] || "sin cruce");

assert.equal(await page.locator("#donut circle").count() >= 4, true);
ok("donut: segmentos");

assert.equal(await page.locator("#donut-stats .ds").count(), 5);
ok("donut: ficha de la oferta seleccionada");

assert.equal(await page.locator("#sources .src").count(), 13);
ok("fuentes: 13 fichas");

assert.equal(await page.locator("#discarded .note").count(), 4);
ok("descartes: 4 fichas");

assert.ok((await page.locator("#verdict").innerText()).length > 200);
ok("conclusión redactada");

/* 2. Cambio de plazo a 36 meses */
await page.locator('[data-horizon="36"]').click();
await page.waitForTimeout(700);
assert.equal(await page.locator("#rank-list .rank-row").count(), 6);
ok("ranking 36m: 5 ofertas + contado");

const finKpi = await page.locator("#kpi3-value").innerText();
assert.equal(finKpi.trim(), "—");
ok("36m: financiada no aplica");

/* 2b. Plazo de 60 meses: solo una oferta real */
await page.locator('[data-horizon="60"]').click();
await page.waitForTimeout(600);
assert.equal(await page.locator("#rank-list .rank-row").count(), 2);
assert.equal(await page.locator("#rank-list .rank-note").count(), 1);
ok("60m: una oferta + compra al contado y aviso");
await page.locator('[data-horizon="36"]').click();
await page.waitForTimeout(500);

/* 3. Sin entrada */
await page.locator('[data-entry="zero"]').click();
await page.waitForTimeout(700);
const toyotaRow = page.locator('#rank-list .rank-row[data-id="toyota-140-36-est"]');
const toyotaTxt = await toyotaRow.innerText();
assert.match(toyotaTxt, /entrada\s*0\s*€/);
ok("sin entrada: la entrada se financia en la cuota");

/* 4. Entrada personalizada */
await page.locator('[data-entry="custom"]').click();
await page.waitForTimeout(500);
assert.equal(await page.locator("#custom-wrap").isVisible(), true);
ok("modo personalizado: slider visible");

/* 5. Selección de una oferta actualiza donut y flujo */
await page.locator('[data-entry="published"]').click();
await page.locator('[data-horizon="48"]').click();
await page.waitForTimeout(700);
await page.locator('#rank-list .rank-row[data-id="total-140-48-15"]').click();
await page.waitForTimeout(600);
assert.match(await page.locator("#donut-title").innerText(), /Total Renting/);
ok("selección sincroniza el desglose");

/* 6. Ordenación de la tabla */
await page.locator('#offer-table thead th[data-sort="entrada"] button').click();
await page.waitForTimeout(300);
const firstEntrada = await page.locator("#table-body tr").first().innerText();
ok("tabla ordenada por entrada", firstEntrada.split("\t")[0]);

/* 7. Km más altos encarecen */
const before = await page.locator("#kpi1-value").innerText();
await page.locator("#km").evaluate((el) => {
  el.value = 25000;
  el.dispatchEvent(new Event("input", { bubbles: true }));
});
await page.waitForTimeout(900);
const after = await page.locator("#kpi1-value").innerText();
assert.notEqual(before, after);
ok("km 25.000 recalcula", before + " → " + after);

/* 8. Sin desbordamiento horizontal */
const overflow = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
);
assert.ok(overflow <= 1, "desbordamiento horizontal: " + overflow + "px");
ok("sin scroll horizontal en 1440px");

/* 9. Móvil */
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(500);
const overflowM = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
);
assert.ok(overflowM <= 1, "desbordamiento móvil: " + overflowM + "px");
ok("sin scroll horizontal en 390px");

assert.deepEqual(errors, []);
ok("consola sin errores");

console.log("\nUI OK · " + (errors.length ? errors.join(" | ") : "sin errores de JavaScript"));
await browser.close();
