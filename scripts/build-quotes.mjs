import fs from "node:fs";
import path from "node:path";

const zenUrl = "https://zenquotes.io/api/today/";
const attribution = " (zenquotes.io)";
const csvPath = path.join("docs", "today.csv");
const jsonPath = path.join("docs", "today.json");

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

const author = `${normalize(a || "Unknown")}${attribution}`;
const quote = normalize(q);
const payload = [
  {
    author,
    content: quote,
  },
];

const csvLine = `${csvEscape(author)},${csvEscape(quote)}\n`;

fs.mkdirSync(path.dirname(csvPath), { recursive: true });
fs.writeFileSync(csvPath, csvLine, "utf8");
fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
