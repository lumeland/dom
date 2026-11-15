import {
  createClone,
  fragmentNodesFromString,
  getElementsByClassName,
  getElementsByTagName,
  getElementsByTagNameWildcard,
  getOuterOrInnerHtml,
  type SelectorAPI,
  selectorAPI,
  setOwnerDocument,
  setParentNode,
} from "./_utils.ts";

class ElementClass extends dom.ParentNode {
  #classList: DOM.DOMTokenList | null = null;
  #attributes: DOM.NamedNodeMap | null = null;

  constructor(tagName: string, attributes: [string, string][]) {
    super(tagName.toUpperCase(), dom.NodeType.ELEMENT_NODE);

    if (attributes.length) {
      this.attributes.push(
        ...attributes.map(([name, value]) => {
          const attr = new dom.Attr(name, value);
          attr[setParentNode](this);
          return attr;
        }),
      );
    }
  }

  [createClone](): DOM.Element {
    return new dom.Element(this.tagName, []);
  }

  get [selectorAPI](): SelectorAPI {
    const api = this.ownerDocument?.[selectorAPI];

    if (!api) {
      console.log([this.ownerDocument]);
      throw new Error("This node must have an owner document to use the Selector API");
    }

    return api;
  }

  cloneNode(subtree?: boolean): DOM.Element {
    const clone = super.cloneNode(subtree) as DOM.Element;

    if (this.#attributes) {
      const clonedAttributes = new dom.NamedNodeMap();
      for (const attr of this.#attributes) {
        const clonedAttribute = attr.cloneNode();
        clonedAttribute[setParentNode](clone);
        clonedAttributes.push(clonedAttribute);
      }
      clone.#attributes = clonedAttributes;
    }
    return clone;
  }

  get attributes(): DOM.NamedNodeMap {
    return this.#attributes ?? (this.#attributes = new dom.NamedNodeMap());
  }
  get classList(): DOMTokenList {
    if (this.#classList) {
      return this.#classList;
    }
    const classList = new dom.DOMTokenList();
    classList.value = this.getAttribute("class") ?? "";
    return (this.#classList = classList);
  }
  set classList(value: string) {
    this.classList.value = value;
  }
  get className(): string {
    return this.classList.value;
  }
  set className(value: string) {
    this.classList.value = value;
  }
  get localName(): string {
    return this.tagName.toLowerCase();
  }
  // to-do: implement other namespaces
  get namespaceURI(): string | null {
    return "http://www.w3.org/1999/xhtml";
  }
  // to-do: implement prefixes
  get prefix(): string | null {
    return null;
  }
  get tagName(): string {
    return this.nodeName;
  }
  get id(): string {
    return this.getAttribute("id") ?? "";
  }
  set id(value: string) {
    this.setAttribute("id", value);
  }
  get innerHTML(): string {
    return getOuterOrInnerHtml(this, false);
  }
  set innerHTML(value: string) {
    const childNodes = this.childNodes;

    for (const child of childNodes) {
      child[setParentNode](null);
    }

    childNodes.splice(0, childNodes.length);

    if (!value.length) {
      return;
    }

    const parsed = fragmentNodesFromString(value, this.localName);
    for (const child of parsed.childNodes[0].childNodes) {
      childNodes.push(child);
      child[setParentNode](this);
      child[setOwnerDocument](this.ownerDocument);
    }
  }
  get outerHTML(): string {
    return getOuterOrInnerHtml(this, true);
  }
  set outerHTML(value: string) {
    throw new Error("to-do");
  }
  get slot(): string {
    throw new Error("to-do");
  }
  set slot(value: string) {
    throw new Error("to-do");
  }
  get part(): DOMTokenList {
    throw new Error("to-do");
  }
  set part(value: string) {
    throw new Error("to-do");
  }
  closest<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
  closest<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
  closest<K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
  closest<E extends DOM.Element = DOM.Element>(selectors: string): E | null {
    throw new Error("to-do");
  }
  getAttribute(qualifiedName: string): string | null {
    return this.#attributes?.getNamedItem(qualifiedName)?.value ?? null;
  }
  getAttributeNS(namespace: string | null, localName: string): string | null {
    throw new Error("to-do");
  }
  getAttributeNames(): string[] {
    return this.#attributes?.map((attr) => attr.name) ?? [];
  }
  getAttributeNode(qualifiedName: string): Attr | null {
    throw new Error("to-do");
  }
  getAttributeNodeNS(namespace: string | null, localName: string): Attr | null {
    throw new Error("to-do");
  }
  getElementsByClassName(classNames: string): DOM.HTMLCollectionOf<DOM.Element> {
    return getElementsByClassName(
      this.childNodes,
      classNames.trim().split(/\s+/),
      new dom.HTMLCollection(),
    );
  }
  getElementsByTagName<K extends keyof HTMLElementTagNameMap>(
    qualifiedName: K,
  ): DOM.HTMLCollectionOf<HTMLElementTagNameMap[K]>;
  getElementsByTagName<K extends keyof SVGElementTagNameMap>(
    qualifiedName: K,
  ): DOM.HTMLCollectionOf<SVGElementTagNameMap[K]>;
  getElementsByTagName<K extends keyof MathMLElementTagNameMap>(
    qualifiedName: K,
  ): DOM.HTMLCollectionOf<MathMLElementTagNameMap[K]>;
  getElementsByTagName(qualifiedName: string): DOM.HTMLCollectionOf<DOM.Element> {
    if (qualifiedName === "*") {
      return getElementsByTagNameWildcard(this.childNodes, new dom.HTMLCollection());
    }

    return getElementsByTagName(
      this.childNodes,
      qualifiedName.toUpperCase(),
      new dom.HTMLCollection(),
    );
  }
  getElementsByTagNameNS(
    namespaceURI: "http://www.w3.org/1999/xhtml",
    localName: string,
  ): DOM.HTMLCollectionOf<DOM.HTMLElement>;
  getElementsByTagNameNS(
    namespaceURI: "http://www.w3.org/2000/svg",
    localName: string,
  ): DOM.HTMLCollectionOf<SVGElement>;
  getElementsByTagNameNS(
    namespaceURI: "http://www.w3.org/1998/Math/MathML",
    localName: string,
  ): DOM.HTMLCollectionOf<MathMLElement>;
  getElementsByTagNameNS(
    namespace: string | null,
    localName: string,
  ): DOM.HTMLCollectionOf<DOM.Element> {
    throw new Error("to-do");
  }
  getHTML(options?: GetHTMLOptions): string {
    throw new Error("to-do");
  }
  hasAttribute(qualifiedName: string): boolean {
    throw new Error("to-do");
  }
  hasAttributeNS(namespace: string | null, localName: string): boolean {
    throw new Error("to-do");
  }
  hasAttributes(): boolean {
    throw new Error("to-do");
  }
  insertAdjacentElement(where: InsertPosition, element: DOM.Element): DOM.Element | null {
    throw new Error("to-do");
  }
  insertAdjacentHTML(position: InsertPosition, string: string): void {
    throw new Error("to-do");
  }
  insertAdjacentText(where: InsertPosition, data: string): void {
    throw new Error("to-do");
  }
  matches<K extends keyof HTMLElementTagNameMap>(selectors: K): this is HTMLElementTagNameMap[K];
  matches<K extends keyof SVGElementTagNameMap>(selectors: K): this is SVGElementTagNameMap[K];
  matches<K extends keyof MathMLElementTagNameMap>(
    selectors: K,
  ): this is MathMLElementTagNameMap[K];
  matches(selectors: string): boolean {
    throw new Error("to-do");
  }
  removeAttribute(qualifiedName: string): void {
    throw new Error("to-do");
  }
  removeAttributeNS(namespace: string | null, localName: string): void {
    throw new Error("to-do");
  }
  removeAttributeNode(attr: Attr): Attr {
    throw new Error("to-do");
  }
  setAttribute(qualifiedName: string, value: string): void {
    const existing = this.attributes.getNamedItem(qualifiedName);
    if (existing) {
      existing.value = value;
      return;
    }
    const attr = new dom.Attr(qualifiedName, value);
    attr[setParentNode](this);
    this.attributes.push(attr);
  }
  setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void {
    throw new Error("to-do");
  }
  setAttributeNode(attr: Attr): Attr | null {
    throw new Error("to-do");
  }
  setAttributeNodeNS(attr: Attr): Attr | null {
    throw new Error("to-do");
  }
  setHTMLUnsafe(html: string): void {
    throw new Error("to-do");
  }
  setPointerCapture(pointerId: number): void {
    throw new Error("to-do");
  }
  toggleAttribute(qualifiedName: string, force?: boolean): boolean {
    throw new Error("to-do");
  }
  after(...nodes: (DOM.Node | string)[]): void {
    throw new Error("to-do");
  }
  before(...nodes: (DOM.Node | string)[]): void {
    throw new Error("to-do");
  }
  remove(): void {
    const siblings = this.parentNode?.childNodes;
    if (!siblings) {
      return;
    }

    siblings.splice(siblings.indexOf(this), 1);
    this[setParentNode](null);
  }
  replaceWith(...nodes: (DOM.Node | string)[]): void {
    throw new Error("to-do");
  }
  get nextElementSibling(): DOM.Element | null {
    const siblings = this.parentElement?.children;

    if (!siblings) {
      return null;
    }

    const index = siblings.indexOf(this);
    return siblings[index + 1] ?? null;
  }
  get previousElementSibling(): DOM.Element | null {
    const siblings = this.parentElement?.children;

    if (!siblings) {
      return null;
    }

    const index = siblings.indexOf(this);
    return index > 0 ? siblings[index - 1] : null;
  }
}

globalThis.dom.Element = ElementClass;

declare global {
  namespace DOM {
    type Element = ElementClass;
  }
  interface DOM {
    Element: typeof ElementClass;
  }
}
