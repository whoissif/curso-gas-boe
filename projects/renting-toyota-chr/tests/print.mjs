import fs from "node:fs";
import vm from "node:vm";
const context = { console, Intl };
vm.createContext(context);
for (const file of ["src/data.js", "src/engine.js"]) vm.runInContext(fs.readFileSync(file, "utf8"), context);
const D = context.CHR_DATA, E = context.CHR_ENGINE;
for (const h of [36,48,60]) {
  for (const mode of ["published","zero"]) {
    const s = { ...D.DEFAULTS, horizon:h, entryMode:mode };
    const list = E.offerList(s).sort((a,b)=>a.totalEq-b.totalEq);
    console.log("\n== " + h + "m · " + mode + " ==");
    for (const o of list) console.log(o.id.padEnd(24), E.fmtEuro(o.totalEq).padStart(9), "| cuota", E.fmtEuro(o.cuotaAjustada,2).padStart(9), "| entrada", E.fmtEuro(o.entradaAjustada).padStart(8));
  }
}
