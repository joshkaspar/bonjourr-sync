import fs from "node:fs";
import path from "node:path";

const zenUrl = "https://zenquotes.io/api/today/";
const attribution = " (via https://zenquotes.io/)";
const outputPath = path.join("docs", "today.csv");

const csvEscape = (s) => `"${String(s ?? "").replace(/"/g, '""')}"`;
const normalize = (s) => String(s ?? "").replace(/\r?\n/g, " ").trim();

const res = await fetch(zenUrl);
if (!res.ok) {
  throw new Error(`ZenQuotes failed: ${res.status}`);
}

const data = await res.json();
const { q, a } = data?.[0] ?? {};

if (!q && !a) {
  throw new Error("ZenQuotes response missing quote data");
}

const author = normalize(a || "Unknown");
const quote = `${normalize(q)}${attribution}`;

const csvLine = `${csvEscape(author)},${csvEscape(quote)}\n`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, csvLine, "utf8");
