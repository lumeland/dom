import {
  checkAncestor,
  $createClone,
  flatNodes,
  getElementsByClassName,
  getElementsByTagName,
  getElementsByTagNameWildcard,
  getOuterOrInnerHtml,
  arrayToNode,
  $ownerElement,
  parseFrag,
  $parentNode,
  $onChange,
  $className,
  reactive,
  matches,
  $normalizeAttr,
} from "./_utils.ts";

class ElementClass extends dom.ParentNode {
  #classList: DOM.DOMTokenList | null = null;
  #attributes: DOM.NamedNodeMap | null = null;
  [$className]?: (value: unknown) => void;

  constructor(tagName: string) {
    super(tagName.toUpperCase(), dom.NodeType.ELEMENT_NODE);

    this[$className] = reactive((from) => {
      // Changed from classList
      if (from instanceof dom.DOMTokenList) {
        this.setAttribute("class", from.value);
        return;
      }

      // Changed from attributes
      if (from instanceof dom.NamedNodeMap) {
        if (this.#classList) {
          this.#classList.value = from.getNamedItem("class")?.value ?? "";
        }
        return;
      }

      // Changed from the "class" Attr
      if (from instanceof dom.Attr) {
        if (this.#classList) {
          this.#classList.value = from.value;
        }
      }
    });
  }

  [$createClone](): DOM.Element {
    return new dom.Element(this.tagName);
  }

  [$normalizeAttr](name: string): string {
    return name.toLowerCase();
  }

  cloneNode(subtree?: boolean): DOM.Element {
    const clone = super.cloneNode(subtree) as DOM.Element;

    if (this.#attributes) {
      const clonedAttributes = new dom.NamedNodeMap();
      for (const attr of this.#attributes) {
        const clonedAttribute = attr.cloneNode() as DOM.Attr;
        clonedAttribute[$parentNode] = clone;
        clonedAttributes.push(clonedAttribute);
      }
      clone.#attributes = clonedAttributes;
    }
    return clone;
  }

  get attributes(): DOM.NamedNodeMap {
    if (this.#attributes) {
      return this.#attributes;
    }
    this.#attributes = new dom.NamedNodeMap();
    this.#attributes[$ownerElement] = this;
    this.#attributes[$onChange] = () => this[$className]?.(this.#attributes);
    return this.#attributes;
  }

  get classList(): DOM.DOMTokenList {
    if (this.#classList) {
      return this.#classList;
    }
    const classList = new dom.DOMTokenList();
    classList.value = this.getAttribute("class") ?? "";
    classList[$onChange] = () => this[$className]?.(classList);

    return (this.#classList = classList);
  }
  set classList(value: string) {
    this.classList.value = value;
  }
  get className(): string {
    return this.getAttribute("class") ?? "";
  }
  set className(value: string) {
    this.setAttribute("class", value);
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
      child[$parentNode] = null;
    }
    childNodes.splice(0, childNodes.length);

    if (!value.length) {
      return;
    }

    const parsed = JSON.parse(parseFrag(value, this.localName));
    const nodes = arrayToNode(parsed, this.ownerDocument!).childNodes[0].childNodes;

    for (const child of nodes) {
      child[$parentNode] = this;
    }
    childNodes.push(...nodes);
  }
  get outerHTML(): string {
    return getOuterOrInnerHtml(this, true);
  }
  set outerHTML(value: string | null) {
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

    const parsed = JSON.parse(parseFrag(value ?? "", contextLocalName));
    const nodes = Array.from(arrayToNode(parsed, this.ownerDocument!).childNodes[0].childNodes);

    for (const child of nodes) {
      child[$parentNode] = parentNode;
    }

    parentNode.childNodes.splice(parentNode.childNodes.indexOf(this), 1, ...nodes);
    this[$parentNode] = null;
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
    qualifiedName = this[$normalizeAttr](qualifiedName);
    return this.#attributes?.getNamedItem(qualifiedName)?.value ?? null;
  }
  getAttributeNS(_namespace: string | null, _localName: string): string | null {
    throw new Error("to-do");
  }
  getAttributeNames(): string[] {
    const names = this.#attributes?.map((attr) => attr.name);
    return names ? Array.from(names) : [];
  }
  getAttributeNode(qualifiedName: string): DOM.Attr | null {
    return this.#attributes?.getNamedItem(qualifiedName) ?? null;
  }
  getAttributeNodeNS(_namespace: string | null, _localName: string): Attr | null {
    throw new Error("to-do");
  }
  getElementsByClassName(classNames: string): DOM.HTMLCollection<DOM.Element> {
    return getElementsByClassName(
      this.childNodes,
      classNames.trim().split(/\s+/),
      new dom.HTMLCollection(),
    );
  }
  getElementsByTagName(qualifiedName: string): DOM.HTMLCollection<DOM.Element> {
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
    _namespace: string | null,
    _localName: string,
  ): DOM.HTMLCollection<DOM.Element> {
    throw new Error("to-do");
  }
  getHTML(_options?: GetHTMLOptions): string {
    throw new Error("to-do");
  }
  hasAttribute(qualifiedName: string): boolean {
    qualifiedName = this[$normalizeAttr](qualifiedName);
    return !!this.#attributes?.getNamedItem(qualifiedName);
  }
  hasAttributeNS(_namespace: string | null, _localName: string): boolean {
    throw new Error("to-do");
  }
  hasAttributes(): boolean {
    throw new Error("to-do");
  }
  insertAdjacentElement(_where: InsertPosition, _element: DOM.Element): DOM.Element | null {
    throw new Error("to-do");
  }
  insertAdjacentHTML(_position: InsertPosition, _string: string): void {
    throw new Error("to-do");
  }
  insertAdjacentText(_where: InsertPosition, _data: string): void {
    throw new Error("to-do");
  }
  matches(selectors: string): boolean {
    return matches(selectors, this);
  }
  removeAttribute(qualifiedName: string): void {
    qualifiedName = this[$normalizeAttr](qualifiedName);
    if (this.hasAttribute(qualifiedName)) {
      this.attributes.removeNamedItem(qualifiedName);
    }
  }
  removeAttributeNS(_namespace: string | null, _localName: string): void {
    throw new Error("to-do");
  }
  removeAttributeNode(attr: DOM.Attr): DOM.Attr {
    const key = this.attributes.indexOf(attr);
    if (key === -1) {
      throw new DOMException("The attribute to remove is not found");
    }
    this.attributes.splice(key, 1);
    attr[$ownerElement] = null;
    return attr;
  }
  setAttribute(qualifiedName: string, value: string): void {
    qualifiedName = this[$normalizeAttr](qualifiedName);
    const existing = this.attributes.getNamedItem(qualifiedName);

    if (existing) {
      existing.value = String(value);
      return;
    }
    const attr = new dom.Attr(qualifiedName);
    attr[$ownerElement] = this;
    attr.value = String(value);
    this.attributes.push(attr);
  }
  setAttributeNS(_namespace: string | null, _qualifiedName: string, _value: string): void {
    throw new Error("to-do");
  }
  setAttributeNode(attr: DOM.Attr): DOM.Attr | null {
    return this.attributes.setNamedItem(attr);
  }
  setAttributeNodeNS(_attr: Attr): Attr | null {
    throw new Error("to-do");
  }
  setHTMLUnsafe(_html: string): void {
    throw new Error("to-do");
  }
  setPointerCapture(_pointerId: number): void {
    throw new Error("to-do");
  }
  toggleAttribute(qualifiedName: string, force?: boolean): boolean {
    qualifiedName = this[$normalizeAttr](qualifiedName);
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

    checkAncestor(this, nodes);
    const allNodes = flatNodes(nodes);

    for (const node of allNodes) {
      if (node === this) {
        continue;
      }

      const oldSiblings = node.parentNode?.childNodes;
      if (oldSiblings) {
        oldSiblings.splice(oldSiblings.indexOf(node), 1);
      }
      node[$parentNode] = parentNode;
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

    checkAncestor(this, nodes);
    const allNodes = flatNodes(nodes);

    for (const node of allNodes) {
      if (node === this) {
        continue;
      }

      const oldSiblings = node.parentNode?.childNodes;
      if (oldSiblings) {
        oldSiblings.splice(oldSiblings.indexOf(node), 1);
      }
      node[$parentNode] = parentNode;
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
    this[$parentNode] = null;
  }
  replaceWith(...nodes: (DOM.Node | string)[]): void {
    const parentNode = this.parentNode;
    const thisSiblings = parentNode?.childNodes;
    if (!thisSiblings) {
      return;
    }

    checkAncestor(this, nodes);
    const allNodes = flatNodes(nodes);
    this[$parentNode] = null;

    for (const node of allNodes) {
      if (node !== this) {
        const oldSiblings = node.parentNode?.childNodes;
        if (oldSiblings) {
          oldSiblings.splice(oldSiblings.indexOf(node), 1);
        }
      }
      node[$parentNode] = parentNode;
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
