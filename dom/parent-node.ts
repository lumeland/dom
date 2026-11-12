import { Node } from "./node.ts";

export class ParentNode extends Node implements globalThis.ParentNode {
  get childElementCount(): number {
    throw new Error("to-do");
  }
  get children(): HTMLCollection {
    throw new Error("to-do");
  }
  get firstElementChild(): Element | null {
    throw new Error("to-do");
  }
  get lastElementChild(): Element | null {
    throw new Error("to-do");
  }
  append(...nodes: (Node | string)[]): void {
    throw new Error("to-do");
  }
  moveBefore(node: Node, child: Node | null): void {
    throw new Error("to-do");
  }
  prepend(...nodes: (Node | string)[]): void {
    throw new Error("to-do");
  }

  querySelector<K extends keyof HTMLElementTagNameMap>(
    selectors: K,
  ): HTMLElementTagNameMap[K] | null;
  querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
  querySelector<K extends keyof MathMLElementTagNameMap>(
    selectors: K,
  ): MathMLElementTagNameMap[K] | null;
  querySelector<E extends Element = Element>(selectors: string): E | null {
    throw new Error("to-do");
  }

  querySelectorAll<K extends keyof HTMLElementTagNameMap>(
    selectors: K,
  ): NodeListOf<HTMLElementTagNameMap[K]>;
  querySelectorAll<K extends keyof SVGElementTagNameMap>(
    selectors: K,
  ): NodeListOf<SVGElementTagNameMap[K]>;
  querySelectorAll<K extends keyof MathMLElementTagNameMap>(
    selectors: K,
  ): NodeListOf<MathMLElementTagNameMap[K]>;
  querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E> {
    throw new Error("to-do");
  }

  replaceChildren(...nodes: (Node | string)[]): void {
    throw new Error("to-do");
  }
}
