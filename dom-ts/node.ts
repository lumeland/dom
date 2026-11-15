import { createClone, setOwnerDocument, setParentNode } from "./_utils.ts";

const NodeTypes = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12,
} as const;

class NodeClass extends EventTarget {
  static readonly ELEMENT_NODE = 1;
  static readonly ATTRIBUTE_NODE = 2;
  static readonly TEXT_NODE = 3;
  static readonly CDATA_SECTION_NODE = 4;
  static readonly ENTITY_REFERENCE_NODE = 5;
  static readonly ENTITY_NODE = 6;
  static readonly PROCESSING_INSTRUCTION_NODE = 7;
  static readonly COMMENT_NODE = 8;
  static readonly DOCUMENT_NODE = 9;
  static readonly DOCUMENT_TYPE_NODE = 10;
  static readonly DOCUMENT_FRAGMENT_NODE = 11;
  static readonly NOTATION_NODE = 12;
  static readonly DOCUMENT_POSITION_DISCONNECTED = 0x01;
  static readonly DOCUMENT_POSITION_PRECEDING = 0x02;
  static readonly DOCUMENT_POSITION_FOLLOWING = 0x04;
  static readonly DOCUMENT_POSITION_CONTAINS = 0x08;
  static readonly DOCUMENT_POSITION_CONTAINED_BY = 0x10;
  static readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;

  readonly ELEMENT_NODE = NodeClass.ELEMENT_NODE;
  readonly ATTRIBUTE_NODE = NodeClass.ATTRIBUTE_NODE;
  readonly TEXT_NODE = NodeClass.TEXT_NODE;
  readonly CDATA_SECTION_NODE = NodeClass.CDATA_SECTION_NODE;
  readonly ENTITY_REFERENCE_NODE = NodeClass.ENTITY_REFERENCE_NODE;
  readonly ENTITY_NODE = NodeClass.ENTITY_NODE;
  readonly PROCESSING_INSTRUCTION_NODE = NodeClass.PROCESSING_INSTRUCTION_NODE;
  readonly COMMENT_NODE = NodeClass.COMMENT_NODE;
  readonly DOCUMENT_NODE = NodeClass.DOCUMENT_NODE;
  readonly DOCUMENT_TYPE_NODE = NodeClass.DOCUMENT_TYPE_NODE;
  readonly DOCUMENT_FRAGMENT_NODE = NodeClass.DOCUMENT_FRAGMENT_NODE;
  readonly NOTATION_NODE = NodeClass.NOTATION_NODE;

  readonly baseURI: string = "";
  readonly nodeName: string;
  readonly nodeType: DOM.NodeType;

  #nodeValue: string | null = null;
  #childNodes: DOM.NodeList<DOM.Node> | null = null;
  #parentNode: DOM.Node | null = null;
  #ownerDocument: DOM.Document | null = null;

  constructor(nodeName: string, nodeType: DOM.NodeType) {
    super();

    this.nodeName = nodeName;
    this.nodeType = nodeType;
  }

  [createClone](): DOM.Node {
    return new dom.Node(this.nodeName, this.nodeType);
  }

  get childNodes(): DOM.NodeList<DOM.Node> {
    return this.#childNodes || (this.#childNodes = new dom.NodeList<DOM.Node>());
  }

  get firstChild(): DOM.Node | null {
    return this.childNodes.item(0);
  }

  get lastChild(): DOM.Node | null {
    const childNodes = this.childNodes;
    return childNodes.item(childNodes.length - 1);
  }

  get isConnected(): boolean {
    return !!this.#ownerDocument;
  }

  get nextSibling(): DOM.Node | null {
    const siblings = this.parentNode?.childNodes;

    if (!siblings) {
      return null;
    }

    const index = siblings.indexOf(this);
    return index !== -1 ? siblings.item(index + 1) : null;
  }

  get ownerDocument(): DOM.Document | null {
    return this.#ownerDocument;
  }

  [setOwnerDocument](ownerDocument: DOM.Document | null) {
    if (ownerDocument === this.#ownerDocument) {
      return;
    }
    this.#ownerDocument = ownerDocument;

    if (this.#childNodes) {
      for (const child of this.#childNodes) {
        child[setOwnerDocument](ownerDocument);
      }
    }
  }

  get parentElement(): DOM.HTMLElement | null {
    if (this.parentNode?.nodeType === NodeTypes.ELEMENT_NODE) {
      return this.parentNode as DOM.HTMLElement;
    }

    return null;
  }

  get parentNode(): DOM.Node | null {
    return this.#parentNode;
  }

  [setParentNode](parentNode: DOM.Node | null) {
    this.#parentNode = parentNode;
  }

  get previousSibling(): DOM.Node | null {
    const siblings = this.parentNode?.childNodes;

    if (!siblings) {
      return null;
    }

    const index = siblings.indexOf(this);
    return index > 0 ? siblings.item(index - 1) : null;
  }

  set nodeValue(value: string | null) {
    this.#nodeValue = value;
  }

  get nodeValue(): string | null {
    return this.#nodeValue;
  }

  set textContent(content: string | null) {
    const childNodes = this.childNodes;
    for (const child of childNodes) {
      child.#parentNode = null;
    }

    childNodes.splice(0, childNodes.length);
    this.appendChild(new dom.Text(content ?? ""));
  }

  get textContent(): string | null {
    let out = "";

    for (const child of this.childNodes) {
      switch (child.nodeType) {
        case NodeTypes.TEXT_NODE:
          out += child.nodeValue;
          break;
        case NodeTypes.ELEMENT_NODE:
          out += child.textContent;
          break;
      }
    }

    return out;
  }

  appendChild<T extends DOM.Node>(node: T): T {
    if (node instanceof dom.DocumentFragment) {
      this.childNodes.push(...node.childNodes);
      node.childNodes.forEach((child) => (child.#parentNode = this));
      node.childNodes.splice(0, node.childNodes.length);
      return node;
    }

    this.childNodes.push(node);
    const siblings = node.parentNode?.childNodes;
    if (siblings) {
      siblings.splice(siblings.indexOf(node), 1);
    }
    node.#parentNode = this;
    return node;
  }

  contains(other: DOM.Node | null): boolean {
    let node = other;
    while (node) {
      if (node === this) {
        return true;
      }

      node = node.parentNode;
    }

    return false;
  }
  hasChildNodes(): boolean {
    return !!this.#childNodes?.length;
  }
  insertBefore<T extends DOM.Node>(node: T, child: DOM.Node | null): T {
    if (child === null) {
      this.appendChild(node);
      return node;
    }

    const index = this.childNodes.indexOf(child);
    if (index === -1) {
      throw new Error("DOMException: Child to insert before is not a child of this node");
    }

    if (node instanceof dom.DocumentFragment) {
      this.childNodes.splice(index, 0, ...node.childNodes);
      node.childNodes.forEach((child) => (child.#parentNode = this));
      node.childNodes.splice(0, node.childNodes.length);
      return node;
    }

    this.childNodes.splice(index, 0, node);

    if (node.#parentNode && node.#parentNode !== this) {
      const oldSiblings = node.#parentNode.childNodes;
      if (oldSiblings) {
        oldSiblings.splice(oldSiblings.indexOf(node), 1);
      }
    }

    node.#parentNode = this;
    return node;
  }
  isSameNode(otherNode: DOM.Node | null): boolean {
    return this === otherNode;
  }

  cloneNode(subtree?: boolean): typeof this {
    const clone = this[createClone]();
    clone.#ownerDocument = this.#ownerDocument;

    if (subtree && this.#childNodes) {
      for (const child of this.childNodes) {
        clone.appendChild(child.cloneNode(true));
      }
    }

    return clone;
  }
  compareDocumentPosition(other: DOM.Node): number {
    throw new Error("to-do");
  }
  getRootNode(options?: GetRootNodeOptions): DOM.Node {
    throw new Error("to-do");
  }
  isDefaultNamespace(namespace: string | null): boolean {
    throw new Error("to-do");
  }
  isEqualNode(otherNode: DOM.Node | null): boolean {
    return this === otherNode;
  }
  lookupNamespaceURI(prefix: string | null): string | null {
    throw new Error("to-do");
  }
  lookupPrefix(namespace: string | null): string | null {
    throw new Error("to-do");
  }
  normalize(): void {
    throw new Error("to-do");
  }
  removeChild<T extends DOM.Node>(child: T): T {
    const childNodes = this.#childNodes;
    const index = childNodes?.indexOf(child);

    if (index === undefined || index === -1) {
      throw new DOMException(
        "Node.removeChild: The node to be removed is not a child of this node",
      );
    }

    childNodes?.splice(index, 1);
    child.#parentNode = null;
    return child;
  }

  replaceChild<T extends DOM.Node>(node: DOM.Node, child: T): T {
    const childNodes = this.#childNodes;
    const index = childNodes?.indexOf(child);

    if (index === undefined || index === -1) {
      throw new DOMException(
        "Node.removeChild: The node to be replaced is not a child of this node",
      );
    }

    childNodes?.splice(index, 1, node);
    child.#parentNode = null;
    node.#parentNode = this;
    return child;
  }
}

globalThis.dom.Node = NodeClass;
globalThis.dom.NodeType = NodeTypes;

declare global {
  namespace DOM {
    type NodeType = (typeof NodeTypes)[keyof typeof NodeTypes];
    type Node = NodeClass;
  }
  interface DOM {
    NodeType: typeof NodeTypes;
    Node: typeof NodeClass;
  }
}
