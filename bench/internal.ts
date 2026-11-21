import { Bench } from "tinybench";
import { DOMParser } from "../mod.ts";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parse, arrayToNode } from "../api/_utils.ts";

const bench = new Bench();
const code = readFileSync(fileURLToPath(import.meta.resolve("./code.html")), "utf-8");
const parser = new DOMParser();
const parsedCode = JSON.parse(parse(code));
const document = parser.parseFromString(code, "text/html");

bench.add("Only parse", () => {
  parse(code);
});

bench.add("Only deserialize", () => {
  arrayToNode(parsedCode, new dom.HTMLDocument());
});

bench.add("Full DOM parse", () => {
  parser.parseFromString(code, "text/html");
});

bench.add("Only stringify", () => {
  if (document.documentElement.outerHTML === "") {
    throw new Error("Empty content");
  }
});

bench.add("Full DOM parse and stringify", () => {
  if (parser.parseFromString(code, "text/html").documentElement.outerHTML === "") {
    throw new Error("Empty content");
  }
});

await bench.run();

console.table(bench.table());
