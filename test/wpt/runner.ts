import { glob } from "node:fs/promises";
import { runTest } from "./wpt.ts";

const patterns = ["wpt/html/dom/documents/dom-tree-accessors/document.getElementsByName/*.xhtml"];

for (const pattern of patterns) {
  for await (const file of glob(pattern)) {
    const { tests } = (await runTest(file)) as any;
    console.log();
    console.log(file);

    for (const test of tests) {
      if (test.status === 0) {
        console.log(`- PASS`);
        continue;
      }

      console.log(`- FAIL: ${test.name}`);
      console.log(`        ${test.message}`);
    }
  }
}
