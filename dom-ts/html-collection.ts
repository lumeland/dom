class HTMLCollectionClass extends Array<DOM.Element> {
  static createFromNodeList(nodes: DOM.NodeList): DOM.HTMLCollection {
    const collection = new dom.HTMLCollection(...nodes.filter(isElement));
    dom.NodeList.sync(nodes, () =>
      collection.splice(0, collection.length, ...nodes.filter(isElement)),
    );
    return collection;
  }

  item(index: number): DOM.Element | null {
    return this[index] ?? null;
  }

  namedItem(name: string): DOM.Element | null {
    throw new Error("to-do");
  }

  toString() {
    return "[object HTMLCollection]";
  }
}

function isElement(node: DOM.Node): node is DOM.Element {
  return node.nodeType === dom.NodeType.ELEMENT_NODE;
}

class HTMLCollectionOfClass<T extends DOM.Element> extends Array<T> {
  item(index: number): T | null {
    return this[index] ?? null;
  }

  namedItem(name: string): T | null {
    throw new Error("to-do");
  }
}

globalThis.dom.HTMLCollection = HTMLCollectionClass;
globalThis.dom.HTMLCollectionOf = HTMLCollectionOfClass;

declare global {
  namespace DOM {
    type HTMLCollection = HTMLCollectionClass;
    type HTMLCollectionOf<T extends DOM.Element> = HTMLCollectionOfClass<T>;
  }
  interface DOM {
    HTMLCollection: typeof HTMLCollectionClass;
    HTMLCollectionOf: typeof HTMLCollectionOfClass;
  }
}
