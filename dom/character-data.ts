import { ChildNode } from "./child-node.ts";
import { NonDocumentTypeChildNode } from "./non-document-type-child-node.ts";

import { applyMixins } from "./utils.ts";
import type { Node, NodeType } from "./node.ts";

const Parent = applyMixins(class extends ChildNode {}, [NonDocumentTypeChildNode]);

export class CharacterData extends Parent implements globalThis.CharacterData {
  data: string;

  constructor(data: string, nodeName: string, nodeType: NodeType, parentNode: Node | null) {
    super(nodeName, nodeType, parentNode);
    this.data = data;
  }

  get length() {
    return this.data.length;
  }
  get ownerDocument(): Document {
    throw new Error("to-do");
  }
  appendData(data: string): void {
    this.data += data;
  }
  deleteData(offset: number, count: number): void {
    throw new Error("to-do");
  }
  insertData(offset: number, data: string): void {
    throw new Error("to-do");
  }
  replaceData(offset: number, count: number, data: string): void {
    throw new Error("to-do");
  }
  substringData(offset: number, count: number): string {
    throw new Error("to-do");
  }
  get textContent(): string {
    return this.data;
  }
  set textContent(value: string | null) {
    this.data = value ?? "";
  }
}
