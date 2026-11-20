import { $onChange } from "./_utils.ts";

class HTMLCollectionClass<T extends DOM.Element = DOM.Element> extends Array<T> {
  static createFromNodeList(nodes: DOM.NodeList): DOM.HTMLCollection {
    const collection = new dom.HTMLCollection(...nodes.filter(isElement));
    nodes[$onChange] = () => collection.splice(0, collection.length, ...nodes.filter(isElement));
    return collection;
  }

  item(index: number): T | null {
    return this[index] ?? null;
  }

  namedItem(_name: string): T | null {
    throw new Error("to-do");
  }

  toString() {
    return "[object HTMLCollection]";
  }
}

function isElement(node: DOM.Node): node is DOM.Element {
  return node.nodeType === dom.NodeType.ELEMENT_NODE;
}

globalThis.dom.HTMLCollection = HTMLCollectionClass;

declare global {
  namespace DOM {
    type HTMLCollection<T extends DOM.Element = DOM.Element> = HTMLCollectionClass<T>;
  }
  interface DOM {
    HTMLCollection: typeof HTMLCollectionClass;
  }
}
