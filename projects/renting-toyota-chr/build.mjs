/* Genera index.html autocontenido a partir de src/.
   Uso: node build.mjs */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

const template = read("src/template.html");
const parts = {
  "/*STYLES*/": read("src/styles.css"),
  "/*DATA*/": read("src/data.js"),
  "/*ENGINE*/": read("src/engine.js"),
  "/*APP*/": read("src/app.js")
};

let html = template;
for (const [marker, content] of Object.entries(parts)) {
  if (!html.includes(marker)) throw new Error("Falta el marcador " + marker);
  html = html.replace(marker, () => content);
}

const out = path.join(root, "index.html");
fs.writeFileSync(out, html, "utf8");

const kb = (Buffer.byteLength(html, "utf8") / 1024).toFixed(1);
console.log("index.html generado · " + kb + " KB · " + html.split("\n").length + " líneas");
console.log("Sin dependencias externas: " + !/https?:\/\/[^"'\s]*(cdn|unpkg|jsdelivr|googleapis)/i.test(html));
