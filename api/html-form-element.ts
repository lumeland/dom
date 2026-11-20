import { $createClone } from "./_utils.ts";

class HTMLFormElementClass extends dom.HTMLElement {
  constructor() {
    super("FORM");
  }

  [$createClone](): DOM.HTMLFormElement {
    return new dom.HTMLFormElement();
  }

  get elements(): DOM.HTMLCollection {
    throw new Error("to-do");
  }
  get length(): number {
    throw new Error("to-do");
  }
  get relList(): DOMTokenList {
    throw new Error("to-do");
  }
  set relList(value: string) {
    throw new Error("to-do");
  }
  get acceptCharset(): string {
    throw new Error("to-do");
  }
  set acceptCharset(value: string) {
    throw new Error("to-do");
  }
  get action(): string {
    throw new Error("to-do");
  }
  set action(value: string) {
    throw new Error("to-do");
  }
  get autocomplete(): AutoFillBase {
    throw new Error("to-do");
  }
  set autocomplete(value: AutoFillBase) {
    throw new Error("to-do");
  }
  get encoding(): string {
    throw new Error("to-do");
  }
  set encoding(value: string) {
    throw new Error("to-do");
  }
  get enctype(): string {
    throw new Error("to-do");
  }
  set enctype(value: string) {
    throw new Error("to-do");
  }
  get method(): string {
    throw new Error("to-do");
  }
  set method(value: string) {
    throw new Error("to-do");
  }
  get name(): string {
    throw new Error("to-do");
  }
  set name(value: string) {
    throw new Error("to-do");
  }
  get noValidate(): boolean {
    throw new Error("to-do");
  }
  set noValidate(value: boolean) {
    throw new Error("to-do");
  }
  get rel(): string {
    throw new Error("to-do");
  }
  set rel(value: string) {
    throw new Error("to-do");
  }
  get target(): string {
    throw new Error("to-do");
  }
  set target(value: string) {
    throw new Error("to-do");
  }
}

globalThis.dom.HTMLFormElement = HTMLFormElementClass;

declare global {
  namespace DOM {
    type HTMLFormElement = HTMLFormElementClass;
  }
  interface DOM {
    HTMLFormElement: typeof HTMLFormElementClass;
  }
}
