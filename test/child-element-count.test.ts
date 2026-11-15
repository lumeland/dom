import { describe, it, expect } from "vitest";
import { dom } from "../mod.ts";

describe("Child element count", () => {
  it("Element.childElementCount with three children", () => {
    const document = new dom.Document();
    const list = document.createElement("ul");
    for (let i = 0; i < 3; i++) {
      list.appendChild(document.createElement("li"));
    }
    expect(list.childElementCount).toBe(3);
  });

  it("Element.childElementCount with non-node", () => {
    const document = new dom.Document();
    const divider = document.createElement("div");
    divider.appendChild(document.createElement("p"));
    divider.appendChild(new dom.Comment());
    expect(divider.childElementCount).toBe(1);
  });

  it("Document.childElementCount with three children", () => {
    const document = new dom.Document();
    for (let i = 0; i < 3; i++) {
      document.appendChild(document.createElement("ul"));
    }
    expect(document.childElementCount).toBe(3);
  });

  it("Element.childElementCount with non-node", () => {
    const document = new dom.Document();
    document.appendChild(document.createElement("p"));
    document.appendChild(new dom.Comment());
    expect(document.childElementCount).toBe(1);
  });
});
