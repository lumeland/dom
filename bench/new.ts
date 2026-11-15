import { Bench } from "tinybench";
import { parse } from "../api/parser.ts";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { nodesFromArray } from "../api/deserialize.ts";
import { nodesFromArray as newNodesFromArray } from "../dom-ts/dom.ts";

const bench = new Bench();
const code = readFileSync(fileURLToPath(import.meta.resolve("./code.html")), "utf-8");
const parsedCode = JSON.parse(parse(code));

bench.add("Old", () => {
  nodesFromArray(parsedCode);
});

bench.add("New", () => {
  newNodesFromArray(parsedCode);
});

await bench.run();

console.log(bench.name);
console.table(bench.table());
