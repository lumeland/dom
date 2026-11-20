import { describe, it } from "vitest";
import "../mod.ts";

// oxlint-disable no-unused-expressions
describe("Nodelist", () => {
  it("Using the public API types for NodeList works", () => {
    interface Queryable {
      querySelector(selectors: string): DOM.Element | null;
      querySelectorAll(selectors: string): DOM.NodeList;
    }

    // Note this test is a type assertion, so there are no actual assertions.
    // Type assertions
    (d: DOM.HTMLDocument): Queryable => d;
    (e: DOM.Document): Queryable => e;
    (e: DOM.Element): Queryable => e;
  });
});
