import { $className, $createClone, $ownerElement } from "./_utils.ts";

class AttrClass extends dom.Node {
  #ownerElement: DOM.Element | null = null;
  #value = "";

  constructor(name: string) {
    super(name, dom.NodeType.ATTRIBUTE_NODE);
  }

  [$createClone](): DOM.Attr {
    const attr = new dom.Attr(this.name);
    attr.value = this.#value;
    return attr;
  }

  cloneNode(subtree?: boolean): DOM.Attr {
    return super.cloneNode(subtree) as DOM.Attr;
  }

  get localName(): string {
    throw new Error("to-do");
  }
  set value(value: string) {
    this.#value = value;
    if (this.name === "class") {
      this.ownerElement?.[$className]?.(this);
    }
  }
  get value(): string {
    return this.#value;
  }
  get name(): string {
    return this.nodeName;
  }
  get namespaceURI(): string | null {
    throw new Error("to-do");
  }
  set [$ownerElement](element: DOM.Element | null) {
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
    return this.#value;
  }
  set textContent(value: string | null) {
    this.#value = value ?? "";
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
