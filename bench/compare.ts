import { Bench } from "tinybench";
import { DOMParser } from "../mod.ts";
import { DOMParser as DenoDom } from "@b-fuze/deno-dom";
import { parse } from "parse5";
import { JSDOM } from "jsdom";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const bench = new Bench();
const code = readFileSync(fileURLToPath(import.meta.resolve("./code.html")), "utf-8");
const parser = new DOMParser();
const denoDom = new DenoDom();

bench.add("@lumeland/dom", () => {
  parser.parseFromString(code, "text/html");
});

bench.add("@b-fuze/deno-dom", () => {
  denoDom.parseFromString(code, "text/html");
});

bench.add("parse5", () => {
  parse(code);
});

bench.add("jsdom", () => {
  new JSDOM(code);
});

await bench.run();

console.log(bench.name);
console.table(bench.table());
