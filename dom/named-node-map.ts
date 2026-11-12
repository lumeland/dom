import { Attr } from "./attr.ts";
import type { Node } from "./node.ts";

export class NamedNodeMap extends Array<Attr> implements globalThis.NamedNodeMap {
  constructor(attributes: [string, string][], parentNode: Node | null) {
    super();
    this.push(...attributes.map(([name, value]) => new Attr(name, value, parentNode)));
  }
  getNamedItem(qualifiedName: string): Attr | null {
    return this.find((item) => item.name === qualifiedName) ?? null;
  }
  getNamedItemNS(namespace: string | null, localName: string): Attr | null {
    throw new Error("to-do");
  }
  item(index: number): Attr | null {
    return this[index] ?? null;
  }
  removeNamedItem(qualifiedName: string): Attr {
    const index = this.findIndex((item) => item.name === qualifiedName);
    if (index === -1) {
      throw new DOMException("Node was not found");
    }
    return this.splice(index, 1)[0];
  }
  removeNamedItemNS(namespace: string | null, localName: string): Attr {
    throw new Error("to-do");
  }
  setNamedItem(attr: Attr): Attr | null {
    const existing = this.getNamedItem(attr.name);
    if (existing) {
      this.removeNamedItem(attr.name);
    }
    this.push(attr);
    return existing ?? null;
  }
  setNamedItemNS(attr: Attr): Attr | null {
    throw new Error("to-do");
  }
}
