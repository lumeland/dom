import { Node } from "./node.ts";

export class ChildNode extends Node implements globalThis.ChildNode {
  after(...nodes: (Node | string)[]): void {
    throw new Error("to-do");
  }
  before(...nodes: (Node | string)[]): void {
    throw new Error("to-do");
  }
  remove(): void {
    throw new Error("to-do");
  }
  replaceWith(...nodes: (Node | string)[]): void {
    throw new Error("to-do");
  }
}
