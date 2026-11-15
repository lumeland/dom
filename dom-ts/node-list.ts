class NodeListClass<T extends DOM.Node = DOM.Node> extends Array<T> {
  #onchange?: () => void;

  static sync(nodes: DOM.NodeList, callback: () => void) {
    nodes.#onchange = callback;
  }

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
  push(...item: T[]) {
    const result = super.push(...item);
    this.#onchange?.();
    return result;
  }
  splice(start: number, deleteCount: number, ...items: T[]) {
    const result = super.splice(start, deleteCount, ...items);
    this.#onchange?.();
    return result;
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
