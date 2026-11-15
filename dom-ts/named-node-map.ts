class NamedNodeMapClass extends Array<DOM.Attr> {
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
    return this.splice(index, 1)[0];
  }
  removeNamedItemNS(namespace: string | null, localName: string): DOM.Attr {
    throw new Error("to-do");
  }
  setNamedItem(attr: DOM.Attr): DOM.Attr | null {
    const existing = this.getNamedItem(attr.name);
    if (existing) {
      this.removeNamedItem(attr.name);
    }
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
