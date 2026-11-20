import { ArrayLike } from "./_utils.ts";

class NodeListClass<T extends DOM.Node = DOM.Node> extends ArrayLike<T> {
  item(index: number): T | null {
    return this[index] ?? null;
  }
  forEach(
    callbackfn: (value: T, key: number, parent: DOM.NodeList<T>) => void,
    thisArg?: any,
  ): void {
    super.forEach((value, key) => callbackfn(value, key, this), thisArg);
  }
  toString() {
    return "[object NodeList]";
  }
}

globalThis.dom.NodeList = NodeListClass;

declare global {
  namespace DOM {
    type NodeList<T extends Node = Node> = NodeListClass<T>;
  }

  interface DOM {
    NodeList: typeof NodeListClass;
  }
}
