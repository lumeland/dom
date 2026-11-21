import { runTest } from "./wpt.ts";

const files = [
  "wpt/html/dom/documents/dom-tree-accessors/document.getElementsByName/document.getElementsByName-case-xhtml.xhtml",
  "wpt/html/dom/documents/dom-tree-accessors/document.getElementsByClassName-same.html",
];

for (const file of files) {
  const { tests } = (await runTest(file)) as any;
  console.log();
  console.log(file);

  for (const test of tests) {
    if (test.status === 0) {
      console.log(`- PASS: ${test.name}`);
      continue;
    }

    console.log(`- FAIL: ${test.name}`);
    console.log(`        ${test.message}`);
  }
}
