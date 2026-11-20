import { checkAncestor, $createClone, $ownerDocument, $parentNode, flatNodes } from "./_utils.ts";

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

  [$createClone](): DOM.Node {
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

  set [$ownerDocument](ownerDocument: DOM.Document | null) {
    if (ownerDocument === this.#ownerDocument) {
      return;
    }
    this.#ownerDocument = ownerDocument;

    if (this.#childNodes) {
      for (const child of this.#childNodes) {
        child[$ownerDocument] = ownerDocument;
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

  set [$parentNode](parentNode: DOM.Node | null) {
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

    checkAncestor(this, [node]);
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

    const childNodes = this.childNodes;
    const index = childNodes.indexOf(child);
    if (index === -1) {
      throw new Error("DOMException: Child to insert before is not a child of this node");
    }

    if (node instanceof dom.DocumentFragment) {
      this.childNodes.splice(index, 0, ...node.childNodes);
      node.childNodes.forEach((child) => (child.#parentNode = this));
      node.childNodes.splice(0, node.childNodes.length);
      return node;
    }

    if (node === child) {
      return node;
    }

    const oldSiblings = node.#parentNode?.childNodes;

    if (oldSiblings) {
      oldSiblings.splice(oldSiblings.indexOf(node), 1);
    }

    childNodes.splice(index, 0, node);
    node.#parentNode = this;
    return node;
  }
  isSameNode(otherNode: DOM.Node | null): boolean {
    return this === otherNode;
  }

  cloneNode(subtree?: boolean): DOM.Node {
    const clone = this[$createClone]();
    clone[$ownerDocument] = this.#ownerDocument;

    if (subtree && this.#childNodes) {
      for (const child of this.childNodes) {
        clone.appendChild(child.cloneNode(true));
      }
    }

    return clone;
  }
  compareDocumentPosition(other: DOM.Node): number {
    if (other === this) {
      return 0;
    }

    // Note: major browser implementations differ in their rejection error of
    // non-Node or nullish values so we just copy the most relevant error message
    // from Firefox
    if (!(other instanceof dom.Node)) {
      throw new TypeError(
        "Node.compareDocumentPosition: Argument 1 does not implement interface Node.",
      );
    }

    let node1Root = other;
    let node2Root = this as DOM.Node;
    const node1Hierarchy = [node1Root];
    const node2Hierarchy = [node2Root];
    while (node1Root.parentNode ?? node2Root.parentNode) {
      node1Root = node1Root.parentNode
        ? (node1Hierarchy.push(node1Root.parentNode), node1Root.parentNode)
        : node1Root;
      node2Root = node2Root.parentNode
        ? (node2Hierarchy.push(node2Root.parentNode), node2Root.parentNode)
        : node2Root;
    }

    // Check if they don't share the same root node
    if (node1Root !== node2Root) {
      return (
        dom.Node.DOCUMENT_POSITION_DISCONNECTED |
        dom.Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC |
        dom.Node.DOCUMENT_POSITION_PRECEDING
      );
    }

    const longerHierarchy =
      node1Hierarchy.length > node2Hierarchy.length ? node1Hierarchy : node2Hierarchy;
    const shorterHierarchy = longerHierarchy === node1Hierarchy ? node2Hierarchy : node1Hierarchy;

    // Check if either is a container of the other
    if (longerHierarchy[longerHierarchy.length - shorterHierarchy.length] === shorterHierarchy[0]) {
      return longerHierarchy === node1Hierarchy
        ? // other is a child of this
          dom.Node.DOCUMENT_POSITION_CONTAINED_BY | dom.Node.DOCUMENT_POSITION_FOLLOWING
        : // this is a child of other
          dom.Node.DOCUMENT_POSITION_CONTAINS | dom.Node.DOCUMENT_POSITION_PRECEDING;
    }

    // Find their first common ancestor and see whether they
    // are preceding or following
    const longerStart = longerHierarchy.length - shorterHierarchy.length;
    for (let i = shorterHierarchy.length - 1; i >= 0; i--) {
      const shorterHierarchyNode = shorterHierarchy[i];
      const longerHierarchyNode = longerHierarchy[longerStart + i];

      // We found the first common ancestor
      if (longerHierarchyNode !== shorterHierarchyNode) {
        const siblings = shorterHierarchyNode.parentNode!.childNodes;

        if (siblings.indexOf(shorterHierarchyNode) < siblings.indexOf(longerHierarchyNode)) {
          // Shorter is before longer
          if (shorterHierarchy === node1Hierarchy) {
            // Other is before this
            return dom.Node.DOCUMENT_POSITION_PRECEDING;
          }
          // This is before other
          return dom.Node.DOCUMENT_POSITION_FOLLOWING;
        }
        // Longer is before shorter
        if (longerHierarchy === node1Hierarchy) {
          // Other is before this
          return dom.Node.DOCUMENT_POSITION_PRECEDING;
        }
        // Other is after this
        return dom.Node.DOCUMENT_POSITION_FOLLOWING;
      }
    }

    // FIXME: Should probably throw here because this
    // point should be unreachable code as per the
    // intended logic
    return Node.DOCUMENT_POSITION_FOLLOWING;
  }
  getRootNode(_options?: GetRootNodeOptions): DOM.Node {
    return this.ownerDocument ?? this.parentElement?.getRootNode() ?? this;
  }
  isDefaultNamespace(_namespace: string | null): boolean {
    throw new Error("to-do");
  }
  isEqualNode(otherNode: DOM.Node | null): boolean {
    return this === otherNode;
  }
  lookupNamespaceURI(_prefix: string | null): string | null {
    throw new Error("to-do");
  }
  lookupPrefix(_namespace: string | null): string | null {
    throw new Error("to-do");
  }
  normalize(): void {
    let i = 0;
    while (i < this.childNodes.length) {
      const currentNode = this.childNodes[i];

      if (currentNode.nodeType === dom.NodeType.TEXT_NODE) {
        if (currentNode.nodeValue === "") {
          this.removeChild(currentNode);
          continue;
        }

        let nodeValue = currentNode.nodeName ?? "";
        let nextNode = this.childNodes[i + 1];

        // Merge adjacent text nodes
        while (nextNode && nextNode.nodeType === dom.NodeType.TEXT_NODE) {
          nodeValue += nextNode.nodeValue;
          this.removeChild(nextNode);
          nextNode = this.childNodes[i + 1];
        }

        if (nodeValue === "") {
          this.removeChild(currentNode);
          continue;
        }
        currentNode.nodeValue = nodeValue;
        i++;
        continue;
      }

      currentNode.normalize();
      i++;
    }
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

    const nodes = flatNodes([node]);
    for (const node of nodes) {
      node.#parentNode = this;
    }

    childNodes?.splice(index, 1, ...nodes);
    child.#parentNode = null;
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
