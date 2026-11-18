import { $ownerElement, ArrayLike } from "./_utils.ts";

class NamedNodeMapClass extends ArrayLike<DOM.Attr> {
  #ownerElement: DOM.Element | null = null;

  set [$ownerElement](ownerElement: DOM.Element) {
    this.#ownerElement = ownerElement;
  }

  set nodeValue(_value: string | null) {
    // Ignored
  }
  get nodeValue() {
    return null;
  }
  getNamedItem(qualifiedName: string): DOM.Attr | null {
    qualifiedName = qualifiedName.toLowerCase();
    return this.find((item) => item.name === qualifiedName) ?? null;
  }
  getNamedItemNS(namespace: string | null, localName: string): DOM.Attr | null {
    throw new Error("to-do");
  }
  item(index: number): DOM.Attr | null {
    return this[index] ?? null;
  }
  removeNamedItem(qualifiedName: string): DOM.Attr {
    const index = this.findIndex((item) => item.name === qualifiedName);
    if (index === -1) {
      throw new DOMException("Node was not found");
    }
    const item = this.splice(index, 1)[0];
    item[$ownerElement] = null;
    return item;
  }
  removeNamedItemNS(namespace: string | null, localName: string): DOM.Attr {
    throw new Error("to-do");
  }
  setNamedItem(attr: DOM.Attr): DOM.Attr | null {
    const existing = this.getNamedItem(attr.name);
    if (existing) {
      this.removeNamedItem(attr.name);
    }
    attr[$ownerElement] = this.#ownerElement;
    this.push(attr);
    return existing ?? null;
  }
  setNamedItemNS(attr: DOM.Attr): DOM.Attr | null {
    throw new Error("to-do");
  }
}

globalThis.dom.NamedNodeMap = NamedNodeMapClass;

declare global {
  namespace DOM {
    type NamedNodeMap = NamedNodeMapClass;
  }
  interface DOM {
    NamedNodeMap: typeof NamedNodeMapClass;
  }
}
