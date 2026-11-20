import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

describe("SVG code", () => {
  it("Viewbox attribute", () => {
    const code = `<svg width="371pt" height="247pt" viewbox="0.00 0.00 370.99 246.71"></svg>`;
    const dom = new DOMParser().parseFromString(code, "text/html");
    const svg = dom.querySelector("svg");

    expect(svg?.getAttribute("viewBox")).toBe("0.00 0.00 370.99 246.71");
    expect(svg?.getAttribute("viewbox")).toBe("0.00 0.00 370.99 246.71");
    expect(svg?.outerHTML).toBe(
      `<svg width="371pt" height="247pt" viewBox="0.00 0.00 370.99 246.71"></svg>`,
    );
  });
});
