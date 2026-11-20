import { $createClone } from "./_utils.ts";

class HTMLScriptElementClass extends dom.HTMLElement {
  constructor() {
    super("SCRIPT");
  }

  [$createClone](): DOM.HTMLScriptElement {
    return new dom.HTMLScriptElement();
  }

  get async(): boolean {
    return this.hasAttribute("async");
  }
  set async(value: boolean) {
    this.setAttribute("async", "");
  }

  get blocking(): DOMTokenList {
    throw new Error("to-do");
  }
  set blocking(value: string) {
    throw new Error("to-do");
  }

  get crossOrigin(): string | null {
    throw new Error("to-do");
  }
  set crossOrigin(value: string | null) {
    throw new Error("to-do");
  }
  get defer(): boolean {
    throw new Error("to-do");
  }
  set defer(value: boolean) {
    throw new Error("to-do");
  }
  get event(): string {
    throw new Error("to-do");
  }
  set event(value: string) {
    throw new Error("to-do");
  }
  get fetchPriority(): "high" | "low" | "auto" {
    throw new Error("to-do");
  }
  set fetchPriority(value: "high" | "low" | "auto") {
    throw new Error("to-do");
  }
  get integrity(): string {
    throw new Error("to-do");
  }
  set integrity(value: string) {
    throw new Error("to-do");
  }
  get noModule(): boolean {
    throw new Error("to-do");
  }
  set noModule(value: boolean) {
    throw new Error("to-do");
  }
  get referrerPolicy(): string {
    throw new Error("to-do");
  }
  set referrerPolicy(value: string) {
    throw new Error("to-do");
  }
  get src(): string {
    throw new Error("to-do");
  }
  set src(value: string) {
    throw new Error("to-do");
  }
  get text(): string {
    throw new Error("to-do");
  }
  set text(value: string) {
    throw new Error("to-do");
  }
  get type(): string {
    throw new Error("to-do");
  }
  set type(value: string) {
    throw new Error("to-do");
  }
}

globalThis.dom.HTMLScriptElement = HTMLScriptElementClass;

declare global {
  namespace DOM {
    type HTMLScriptElement = HTMLScriptElementClass;
  }
  interface DOM {
    HTMLScriptElement: typeof HTMLScriptElementClass;
  }
}
