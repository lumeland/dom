import { resolve } from "node:path";
import { Worker } from "node:worker_threads";

export function runTest(file: string): Promise<unknown> {
  return new Promise((resolveResult, reject) => {
    const worker = new Worker(new URL("./wpt-worker.ts", import.meta.url), {
      workerData: resolve(file),
    });

    const timer = setTimeout(() => {
      void worker.terminate();
      reject(new Error(`Timed out: ${file}`));
    }, 15_000);

    worker.once("message", (result) => {
      clearTimeout(timer);
      resolveResult(result);
    });
    worker.once("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    worker.once("exit", (code) => {
      clearTimeout(timer);
      if (code !== 0) reject(new Error(`Worker exited with code ${code}`));
      else reject(new Error("Worker exited without reporting results"));
    });
  });
}
