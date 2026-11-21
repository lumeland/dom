import { readFileSync } from "node:fs";
import { parentPort, workerData } from "node:worker_threads";
import { DOMParser } from "../../mod.ts";

declare const setup: (options: { explicit_done: boolean }) => void;
declare const done: () => void;
declare const add_completion_callback: (
  callback: (
    tests: { name: string; status: number; message: string | null }[],
    status: { status: number; message: string | null },
  ) => void,
) => void;

await import("./testharness.js");
setup({ explicit_done: true });

add_completion_callback((tests, status) => {
  parentPort!.postMessage({
    status: { status: status.status, message: status.message },
    tests: tests.map(({ name, status, message }) => ({ name, status, message })),
  });
});

const content = readFileSync(workerData, "utf8");
const document = new DOMParser().parseFromString(content, "text/html");
const scripts = Array.from(document.getElementsByTagName("script"));
const inlineScripts = scripts.filter((script) => !script.hasAttribute("src"));

if (inlineScripts.length !== 1) {
  throw new Error("Expected exactly one inline test script");
}

Object.defineProperty(globalThis, "document", { value: document });
new Function("document", inlineScripts[0].textContent)(document);
done();
