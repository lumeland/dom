import { Node, NodeTypes } from "./node.ts";

export class Attr extends Node implements globalThis.Attr {
  value: string;

  constructor(name: string, value: string, parentNode: Node | null) {
    super(name, NodeTypes.ATTRIBUTE_NODE, parentNode);
    this.value = value;
  }

  get localName(): string {
    throw new Error("to-do");
  }
  get name(): string {
    return this.nodeName;
  }
  get namespaceURI(): string | null {
    throw new Error("to-do");
  }
  get ownerDocument(): Document {
    throw new Error("to-do");
  }
  get ownerElement(): Element | null {
    throw new Error("to-do");
  }
  get prefix(): string | null {
    throw new Error("to-do");
  }
  get specified(): boolean {
    return true;
  }
  get textContent(): string {
    return this.value;
  }
  set textContent(value: string | null) {
    this.value = value ?? "";
  }
  override appendChild<T extends globalThis.Node>(): T {
    throw new DOMException("Cannot add children to an Attribute");
  }

  override replaceChild<T extends globalThis.Node>(): T {
    throw new DOMException("Cannot add children to an Attribute");
  }

  override insertBefore<T extends globalThis.Node>(): T {
    throw new DOMException("Cannot add children to an Attribute");
  }

  override removeChild<T extends globalThis.Node>(): T {
    throw new DOMException("The node to be removed is not a child of this node");
  }
}
