import { describe, it, expect } from "vitest";
import { dom } from "../mod.ts";

describe("Node constants", () => {
  it("Node#TEXT_NODE, Node#ELEMENT_NODE, et al. instance nodeType constants", () => {
    const doc = new dom.Document();
    const div = doc.createElement("div");

    expect(div.ELEMENT_NODE).toBe(dom.Node.ELEMENT_NODE);
    expect(div.ATTRIBUTE_NODE).toBe(dom.Node.ATTRIBUTE_NODE);
    expect(div.TEXT_NODE).toBe(dom.Node.TEXT_NODE);
    expect(div.CDATA_SECTION_NODE).toBe(dom.Node.CDATA_SECTION_NODE);
    expect(div.ENTITY_REFERENCE_NODE).toBe(dom.Node.ENTITY_REFERENCE_NODE);
    expect(div.ENTITY_NODE).toBe(dom.Node.ENTITY_NODE);
    expect(div.PROCESSING_INSTRUCTION_NODE).toBe(dom.Node.PROCESSING_INSTRUCTION_NODE);
    expect(div.COMMENT_NODE).toBe(dom.Node.COMMENT_NODE);
    expect(div.DOCUMENT_NODE).toBe(dom.Node.DOCUMENT_NODE);
    expect(div.DOCUMENT_TYPE_NODE).toBe(dom.Node.DOCUMENT_TYPE_NODE);
    expect(div.DOCUMENT_FRAGMENT_NODE).toBe(dom.Node.DOCUMENT_FRAGMENT_NODE);
    expect(div.NOTATION_NODE).toBe(dom.Node.NOTATION_NODE);
  });

  it("Node.TEXT_NODE, Node.ELEMENT_NODE, et al. static nodeType constants", () => {
    expect(dom.Node.ELEMENT_NODE).toBe(dom.NodeType.ELEMENT_NODE);
    expect(dom.Node.ATTRIBUTE_NODE).toBe(dom.NodeType.ATTRIBUTE_NODE);
    expect(dom.Node.TEXT_NODE).toBe(dom.NodeType.TEXT_NODE);
    expect(dom.Node.CDATA_SECTION_NODE).toBe(dom.NodeType.CDATA_SECTION_NODE);
    expect(dom.Node.ENTITY_REFERENCE_NODE).toBe(dom.NodeType.ENTITY_REFERENCE_NODE);
    expect(dom.Node.ENTITY_NODE).toBe(dom.NodeType.ENTITY_NODE);
    expect(dom.Node.PROCESSING_INSTRUCTION_NODE).toBe(dom.NodeType.PROCESSING_INSTRUCTION_NODE);
    expect(dom.Node.COMMENT_NODE).toBe(dom.NodeType.COMMENT_NODE);
    expect(dom.Node.DOCUMENT_NODE).toBe(dom.NodeType.DOCUMENT_NODE);
    expect(dom.Node.DOCUMENT_TYPE_NODE).toBe(dom.NodeType.DOCUMENT_TYPE_NODE);
    expect(dom.Node.DOCUMENT_FRAGMENT_NODE).toBe(dom.NodeType.DOCUMENT_FRAGMENT_NODE);
    expect(dom.Node.NOTATION_NODE).toBe(dom.NodeType.NOTATION_NODE);
  });
});
