import { NodeListOf } from "./node-list.ts";
import { Text } from "./text.ts";
import type { ChildNode } from "./child-node.ts";
import type { ParentNode } from "./parent-node.ts";

export const NodeTypes = {
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

export type NodeType = (typeof NodeTypes)[keyof typeof NodeTypes];

export const setParentNode = Symbol.for("setParentNode");
export const setOwnerDocument = Symbol.for("setOwnerDocument");

export class Node extends EventTarget implements globalThis.Node {
  readonly ELEMENT_NODE = 1;
  readonly ATTRIBUTE_NODE = 2;
  readonly TEXT_NODE = 3;
  readonly CDATA_SECTION_NODE = 4;
  readonly ENTITY_REFERENCE_NODE = 5;
  readonly ENTITY_NODE = 6;
  readonly PROCESSING_INSTRUCTION_NODE = 7;
  readonly COMMENT_NODE = 8;
  readonly DOCUMENT_NODE = 9;
  readonly DOCUMENT_TYPE_NODE = 10;
  readonly DOCUMENT_FRAGMENT_NODE = 11;
  readonly NOTATION_NODE = 12;
  readonly DOCUMENT_POSITION_DISCONNECTED = 0x01;
  readonly DOCUMENT_POSITION_PRECEDING = 0x02;
  readonly DOCUMENT_POSITION_FOLLOWING = 0x04;
  readonly DOCUMENT_POSITION_CONTAINS = 0x08;
  readonly DOCUMENT_POSITION_CONTAINED_BY = 0x10;
  readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 0x20;

  readonly baseURI: string = "";
  readonly nodeName: string;
  readonly nodeType: number;
  nodeValue: string | null = null;

  #childNodes: NodeListOf<ChildNode> | null = null;
  #parentNode: ParentNode | null = null;
  #ownerDocument: Document | null = null;

  constructor(nodeName: string, nodeType: NodeType, parentNode: Node | null) {
    super();

    this.nodeName = nodeName;
    this.nodeType = nodeType;

    if (parentNode) {
      parentNode.appendChild(this);
    }
  }

  get childNodes(): NodeListOf<ChildNode> {
    return this.#childNodes || (this.#childNodes = new NodeListOf<ChildNode>());
  }

  get firstChild(): ChildNode | null {
    return this.childNodes.item(0);
  }

  get lastChild(): ChildNode | null {
    const childNodes = this.childNodes;
    return childNodes.item(childNodes.length - 1);
  }

  get isConnected(): boolean {
    throw new Error("to-do");
  }

  get nextSibling(): ChildNode | null {
    const siblings = this.parentNode?.childNodes;

    if (!siblings) {
      return null;
    }

    const index = (siblings as unknown as Array<Node>).indexOf(this);
    return index !== -1 ? siblings.item(index + 1) : null;
  }

  get ownerDocument(): Document | null {
    return this.#ownerDocument;
  }

  [setOwnerDocument](ownerDocument: Document | null) {
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

  get parentElement(): HTMLElement | null {
    if (this.parentNode?.nodeType === NodeTypes.ELEMENT_NODE) {
      return this.parentNode as unknown as HTMLElement;
    }

    return null;
  }

  get parentNode(): ParentNode | null {
    return this.#parentNode;
  }

  [setParentNode](parentNode: ParentNode | null) {
    this.#parentNode = parentNode;
  }

  get previousSibling(): ChildNode | null {
    const siblings = this.parentNode?.childNodes;

    if (!siblings) {
      return null;
    }

    const index = (siblings as unknown as Array<Node>).indexOf(this);
    return index > 1 ? siblings.item(index - 1) : null;
  }

  set textContent(content: string | null) {
    for (const child of this.childNodes) {
      (child as ChildNode)[setParentNode](null);
    }

    const children = this.#childNodes as NodeListOf<ChildNode> | undefined;
    children?.slice(0, children.length);

    this.appendChild(new Text(content ?? ""));
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

  appendChild<T extends globalThis.Node>(node: T): T {
    throw new Error("to-do");
  }
  cloneNode(subtree?: boolean): globalThis.Node {
    throw new Error("to-do");
  }
  compareDocumentPosition(other: globalThis.Node): number {
    throw new Error("to-do");
  }
  contains(other: Node | null): boolean {
    let node: Node | null = other;
    while (node) {
      if (node === this) {
        return true;
      }

      node = node.parentNode;
    }

    return false;
  }
  getRootNode(options?: GetRootNodeOptions): globalThis.Node {
    throw new Error("to-do");
  }
  hasChildNodes(): boolean {
    throw new Error("to-do");
  }
  insertBefore<T extends globalThis.Node>(node: T, child: globalThis.Node | null): T {
    throw new Error("to-do");
  }
  isDefaultNamespace(namespace: string | null): boolean {
    throw new Error("to-do");
  }
  isEqualNode(otherNode: globalThis.Node | null): boolean {
    throw new Error("to-do");
  }
  isSameNode(otherNode: globalThis.Node | null): boolean {
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
  removeChild<T extends globalThis.Node>(child: T): T {
    const childNodes = this.#childNodes;
    const index = childNodes?.indexOf(child as unknown as ChildNode);

    if (index === undefined || index === -1) {
      throw new DOMException(
        "Node.removeChild: The node to be removed is not a child of this node",
      );
    }

    childNodes?.splice(index, 1);
    (child as unknown as Node)[setParentNode](null);
    return child;
  }
  replaceChild<T extends globalThis.Node>(node: globalThis.Node, child: T): T {
    throw new Error("to-do");
  }
}
