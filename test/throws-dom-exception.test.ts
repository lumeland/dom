import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("Dom exceptions", () => {
  it("Invalid querySelector query throws DOMException", () => {
    const doc = new DOMParser().parseFromString("<div></div>", "text/html");
    expect(() => doc.querySelector("div]")).toThrow(DOMException);
  });
});
