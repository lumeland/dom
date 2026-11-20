import { $createClone, flatNodes, $parentNode } from "./_utils.ts";

class CharacterDataClass extends dom.Node {
  #nodeValue: string;

  constructor(data: string, nodeName: string, nodeType: DOM.NodeType) {
    super(nodeName, nodeType);
    this.#nodeValue = String(data);
  }

  [$createClone](): DOM.CharacterData {
    return new dom.CharacterData(this.data, this.nodeName, this.nodeType);
  }

  get length() {
    return this.data.length;
  }

  get nodeValue(): string {
    return this.#nodeValue ?? "";
  }

  set nodeValue(value: any) {
    this.#nodeValue = String(value ?? "");
  }

  get data(): string {
    return this.nodeValue;
  }

  set data(value: string) {
    this.nodeValue = value;
  }

  get textContent(): string {
    return this.nodeValue;
  }
  set textContent(value: string | null) {
    this.nodeValue = value;
  }

  appendData(data: string): void {
    this.data += data;
  }

  deleteData(offset: number, count: number): void {
    this.data = this.data.slice(offset, offset + count);
  }
  insertData(offset: number, data: string): void {
    this.data = `${this.data.slice(0, offset)}${data}${this.data.slice(offset)}`;
  }
  replaceData(offset: number, count: number, data: string): void {
    this.data = `${this.data.slice(0, offset)}${data}${this.data.slice(offset + count)}`;
  }
  substringData(offset: number, count: number): string {
    return this.data.slice(offset, offset + count);
  }
  after(...nodes: (DOM.Node | string)[]): void {
    const parentNode = this.parentNode;
    const thisSiblings = parentNode?.childNodes;
    if (!thisSiblings) {
      return;
    }

    const allNodes = flatNodes(nodes);

    for (const node of allNodes) {
      const oldSiblings = node.parentNode?.childNodes;
      if (oldSiblings) {
        oldSiblings.splice(oldSiblings.indexOf(node), 1);
      }
      node[$parentNode] = parentNode;
    }

    const index = thisSiblings.indexOf(this) + 1;
    if (index === thisSiblings.length) {
      thisSiblings.push(...allNodes);
    } else {
      thisSiblings.splice(index, 0, ...allNodes);
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
      const oldSiblings = node.parentNode?.childNodes;
      if (oldSiblings) {
        oldSiblings.splice(oldSiblings.indexOf(node), 1);
      }
      node[$parentNode] = parentNode;
    }

    thisSiblings.splice(thisSiblings.indexOf(this), 0, ...allNodes);
  }
  remove(): void {
    this.parentNode?.removeChild(this);
  }
  replaceWith(...nodes: (DOM.Node | string)[]): void {
    const parentNode = this.parentNode;
    const thisSiblings = parentNode?.childNodes;
    if (!thisSiblings) {
      return;
    }

    const allNodes = flatNodes(nodes);

    for (const node of allNodes) {
      const oldSiblings = node.parentNode?.childNodes;
      if (oldSiblings) {
        oldSiblings.splice(oldSiblings.indexOf(node), 1);
      }
      node[$parentNode] = parentNode;
    }

    this[$parentNode] = null;
    thisSiblings.splice(thisSiblings.indexOf(this), 1, ...allNodes);
  }
}

globalThis.dom.CharacterData = CharacterDataClass;

declare global {
  namespace DOM {
    type CharacterData = CharacterDataClass;
  }
  interface DOM {
    CharacterData: typeof CharacterDataClass;
  }
}
