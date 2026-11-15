import { createClone, setOwnerElement } from "./_utils.ts";

class AttrClass extends dom.Node {
  #ownerElement: DOM.Element | null = null;
  value: string;

  constructor(name: string, value: string) {
    super(name, dom.NodeType.ATTRIBUTE_NODE);
    this.value = value;
  }

  [createClone](): DOM.Attr {
    return new dom.Attr(this.name, this.value);
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
  [setOwnerElement](element: DOM.Element | null) {
    this.#ownerElement = element;
  }
  get ownerElement(): DOM.Element | null {
    return this.#ownerElement;
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
  override appendChild<T extends DOM.Node>(): T {
    throw new DOMException("Cannot add children to an Attribute");
  }

  override replaceChild<T extends DOM.Node>(): T {
    throw new DOMException("Cannot add children to an Attribute");
  }

  override insertBefore<T extends DOM.Node>(): T {
    throw new DOMException("Cannot add children to an Attribute");
  }

  override removeChild<T extends DOM.Node>(): T {
    throw new DOMException("The node to be removed is not a child of this node");
  }
}

globalThis.dom.Attr = AttrClass;

declare global {
  namespace DOM {
    type Attr = AttrClass;
  }
  interface DOM {
    Attr: typeof AttrClass;
  }
}
