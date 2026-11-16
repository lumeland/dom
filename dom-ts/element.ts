import {
  createClone,
  flatNodes,
  getElementsByClassName,
  getElementsByTagName,
  getElementsByTagNameWildcard,
  getOuterOrInnerHtml,
  nodesFromArray,
  parseFrag,
  type SelectorAPI,
  selectorAPI,
  setOwnerElement,
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
          attr[setOwnerElement](this);
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
  set nodeValue(_value: string | null) {
    // Ignored
  }
  get nodeValue() {
    return null;
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

    const parsed = JSON.parse(parseFrag(value, this.localName));
    const nodes = Array.from(nodesFromArray(parsed, this.ownerDocument).childNodes[0].childNodes);

    for (const child of nodes) {
      child[setParentNode](this);
    }
    childNodes.push(...nodes);
  }
  get outerHTML(): string {
    return getOuterOrInnerHtml(this, true);
  }
  set outerHTML(value: string) {
    const parentNode = this.parentNode;

    if (!parentNode) {
      return;
    }

    if (parentNode.nodeType === dom.NodeType.DOCUMENT_NODE) {
      throw new DOMException("Modifications are not allowed for this document");
    }

    const { parentElement } = this;
    const contextLocalName =
      parentNode.nodeType === dom.NodeType.DOCUMENT_FRAGMENT_NODE
        ? "body"
        : parentElement?.localName;

    const parsed = JSON.parse(parseFrag(value, contextLocalName));
    const nodes = Array.from(nodesFromArray(parsed, this.ownerDocument).childNodes[0].childNodes);

    for (const child of nodes) {
      child[setParentNode](parentNode);
    }

    parentNode.childNodes.splice(parentNode.childNodes.indexOf(this), 1, ...nodes);
    this[setParentNode](null);
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
  closest<E extends DOM.Element = DOM.Element>(selectors: string): E | null {
    // oxlint-disable-next-line typescript/no-this-alias
    let el: DOM.Element | null = this;

    do {
      if (el.matches(selectors)) return el as E;
      el = el.parentElement;
    } while (el !== null);
    return null;
  }
  getAttribute(qualifiedName: string): string | null {
    if (qualifiedName === "class" && this.#classList) {
      return this.#classList.value;
    }
    return this.#attributes?.getNamedItem(qualifiedName)?.value ?? null;
  }
  getAttributeNS(namespace: string | null, localName: string): string | null {
    throw new Error("to-do");
  }
  getAttributeNames(): string[] {
    return this.#attributes?.map((attr) => attr.name) ?? [];
  }
  getAttributeNode(qualifiedName: string): DOM.Attr | null {
    return this.#attributes?.getNamedItem(qualifiedName) ?? null;
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
    return this.#attributes?.getNamedItem(qualifiedName) !== null;
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
  matches(selectors: string): boolean {
    return this[selectorAPI].match(selectors, this);
  }
  removeAttribute(qualifiedName: string): void {
    this.attributes.removeNamedItem(qualifiedName);
  }
  removeAttributeNS(namespace: string | null, localName: string): void {
    throw new Error("to-do");
  }
  removeAttributeNode(attr: Attr): Attr {
    throw new Error("to-do");
  }
  setAttribute(qualifiedName: string, value: string): void {
    if (qualifiedName === "class" && this.#classList) {
      this.#classList.value = value;
    }
    const existing = this.attributes.getNamedItem(qualifiedName);
    if (existing) {
      existing.value = String(value);
      return;
    }
    const attr = new dom.Attr(qualifiedName, String(value));
    attr[setOwnerElement](this);
    this.attributes.push(attr);
  }
  setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void {
    throw new Error("to-do");
  }
  setAttributeNode(attr: DOM.Attr): DOM.Attr | null {
    return this.attributes.setNamedItem(attr);
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
    const existing = this.attributes.getNamedItem(qualifiedName);

    if (force === true) {
      if (!existing) {
        this.setAttribute(qualifiedName, "");
      }
      return true;
    }

    if (force === false) {
      if (existing) {
        this.removeAttribute(qualifiedName);
      }
      return false;
    }

    if (existing) {
      this.removeAttribute(qualifiedName);
      return false;
    }

    this.setAttribute(qualifiedName, "");
    return true;
  }
  after(...nodes: (DOM.Node | string)[]): void {
    const parentNode = this.parentNode;
    const thisSiblings = parentNode?.childNodes;
    if (!thisSiblings) {
      return;
    }

    const allNodes = flatNodes(nodes);

    for (const node of allNodes) {
      if (node === this) {
        continue;
      }

      const oldSiblings = node.parentNode?.childNodes;
      if (oldSiblings) {
        oldSiblings.splice(oldSiblings.indexOf(node), 1);
      }
      node[setParentNode](parentNode);
    }

    if (allNodes.includes(this)) {
      thisSiblings.splice(thisSiblings.indexOf(this), 1, ...allNodes);
    } else {
      thisSiblings.splice(thisSiblings.indexOf(this) + 1, 0, ...allNodes);
    }
  }
  before(...nodes: (DOM.Node | string)[]): void {
    const parentNode = this.parentNode;
    const thisSiblings = parentNode?.childNodes;
    if (!thisSiblings) {
      return;
    }

    const allNodes = flatNodes(nodes);

    for (const node of allNodes) {
      if (node === this) {
        continue;
      }

      const oldSiblings = node.parentNode?.childNodes;
      if (oldSiblings) {
        oldSiblings.splice(oldSiblings.indexOf(node), 1);
      }
      node[setParentNode](parentNode);
    }

    if (allNodes.includes(this)) {
      thisSiblings.splice(thisSiblings.indexOf(this), 1, ...allNodes);
    } else {
      thisSiblings.splice(thisSiblings.indexOf(this), 0, ...allNodes);
    }
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
    const parentNode = this.parentNode;
    const thisSiblings = parentNode?.childNodes;
    if (!thisSiblings) {
      return;
    }

    const allNodes = flatNodes(nodes);
    this[setParentNode](null);

    for (const node of allNodes) {
      node[setParentNode](parentNode);

      if (node !== this) {
        const oldSiblings = node.parentNode?.childNodes;
        if (oldSiblings) {
          oldSiblings.splice(oldSiblings.indexOf(node), 1);
        }
      }
    }

    thisSiblings.splice(thisSiblings.indexOf(this), 1, ...allNodes);
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
