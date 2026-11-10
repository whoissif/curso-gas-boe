import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const context = { console, Intl };
vm.createContext(context);
for (const file of ["src/data.js", "src/engine.js"]) {
  vm.runInContext(fs.readFileSync(new URL("../" + file, import.meta.url), "utf8"), context, {
    filename: file
  });
}
const D = context.CHR_DATA;
const E = context.CHR_ENGINE;

const state = { ...D.DEFAULTS };
const list = E.offerList(state).sort((a, b) => a.totalEq - b.totalEq);

console.log("Estado:", state.horizon, "meses ·", state.km, "km/año · entrada:", state.entryMode);
console.log("Ofertas:", list.length);
for (const o of list) {
  console.log(
    o.id.padEnd(24),
    E.fmtEuro(o.totalEq).padStart(10),
    "/mes eq | nominal",
    E.fmtEuro(o.nominalMonthly).padStart(10),
    "| total",
    E.fmtEuro(o.nominalTotal).padStart(12),
    "|",
    o.badge.label
  );
}

const buyCash = E.purchaseCashMetrics("140H", state);
const buyFin = E.purchaseFinanceMetrics("140H", state);
console.log("\nCompra 140H contado 48m:", E.fmtEuro(buyCash.totalEq), "/mes eq | nominal", E.fmtEuro(buyCash.nominalTotal), "| residual", E.fmtEuro(buyCash.residual));
console.log("Compra 140H financiada 48m:", E.fmtEuro(buyFin.totalEq), "/mes eq | nominal", E.fmtEuro(buyFin.nominalTotal), "| residual", E.fmtEuro(buyFin.residual));

for (const h of [36, 48, 60]) {
  const s = { ...state, horizon: h };
  const best = E.bestOfferForHorizon(s, "140H", h);
  const cash = E.purchaseForHorizon(s, "140H", h, "cash");
  console.log(
    h + "m: mejor renting 140H",
    best ? E.fmtEuro(best.totalEq) + " (" + best.id + ")" : "n/d",
    "| compra contado",
    E.fmtEuro(cash.totalEq),
    "| dif",
    best ? E.fmtEuro(best.totalEq - cash.totalEq) : "n/d"
  );
}

// Comprobaciones de coherencia
const toyota = E.offerMetrics(D.OFFERS.find((o) => o.id === "toyota-140-48-10"), { ...state, km: 15000 });
assert.ok(Math.abs(toyota.cuotaAjustada - 367.5) < 0.001, "cuota 140H a 15k debe ser 367,50");
const total = E.offerMetrics(D.OFFERS.find((o) => o.id === "total-140-48-15"), { ...state, km: 15000 });
assert.ok(Math.abs(total.totalEq - 626.4) < 1.5, "Total Renting 48m/15k debe rondar 626 €/mes con energía");
const sum = toyota.components.entrada + toyota.components.cuota + toyota.components.extras + toyota.components.energia;
assert.ok(Math.abs(sum - toyota.totalEq) < 0.001, "los componentes deben sumar el total equivalente");
console.log("\nOK: comprobaciones básicas superadas.");
