import { flatNodes, type SelectorAPI, selectorAPI, setParentNode } from "./_utils.ts";

abstract class ParentNodeClass extends dom.Node {
  #children: DOM.HTMLCollection | null = null;

  abstract get [selectorAPI](): SelectorAPI;

  get childElementCount(): number {
    return this.children.length;
  }
  get children(): DOM.HTMLCollection {
    return (
      this.#children ?? (this.#children = dom.HTMLCollection.createFromNodeList(this.childNodes))
    );
  }
  get firstElementChild(): DOM.Element | null {
    return this.children[0] ?? null;
  }
  get lastElementChild(): DOM.Element | null {
    const length = this.children.length;
    return length ? this.children[this.children.length - 1] : null;
  }
  append(...nodes: (DOM.Node | string)[]): void {
    const allNodes = flatNodes(nodes);

    for (const node of allNodes) {
      const oldSiblings = node.parentNode?.childNodes;
      if (oldSiblings) {
        oldSiblings.splice(oldSiblings.indexOf(node), 1);
      }
      node[setParentNode](this);
    }

    this.childNodes.push(...allNodes);
  }
  moveBefore(node: DOM.Node, child: DOM.Node | null): void {
    throw new Error("to-do");
  }
  prepend(...nodes: (DOM.Node | string)[]): void {
    const allNodes = flatNodes(nodes);

    for (const node of allNodes) {
      const oldSiblings = node.parentNode?.childNodes;
      if (oldSiblings) {
        oldSiblings.splice(oldSiblings.indexOf(node), 1);
      }
      node[setParentNode](this);
    }

    this.childNodes.unshift(...allNodes);
  }
  querySelector<E extends DOM.Element = DOM.Element>(selectors: string): E | null {
    return this[selectorAPI].first(selectors, this) as E;
  }
  querySelectorAll<K extends keyof HTMLElementTagNameMap>(
    selectors: K,
  ): DOM.NodeList<HTMLElementTagNameMap[K]>;
  querySelectorAll<K extends keyof SVGElementTagNameMap>(
    selectors: K,
  ): DOM.NodeList<SVGElementTagNameMap[K]>;
  querySelectorAll<K extends keyof MathMLElementTagNameMap>(
    selectors: K,
  ): DOM.NodeList<MathMLElementTagNameMap[K]>;
  querySelectorAll<E extends DOM.Element = DOM.Element>(selectors: string): DOM.NodeList<E> {
    throw new Error("to-do");
  }
  replaceChildren(...nodes: (DOM.Node | string)[]): void {
    throw new Error("to-do");
  }
}

globalThis.dom.ParentNode = ParentNodeClass;

declare global {
  namespace DOM {
    type ParentNode = ParentNodeClass;
  }
  interface DOM {
    ParentNode: typeof ParentNodeClass;
  }
}
