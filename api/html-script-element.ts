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
    return this.hasAttribute("nomodule");
  }
  set noModule(value: boolean) {
    if (value) {
      this.setAttribute("nomodule", "");
    } else {
      this.removeAttribute("nomodule");
    }
  }
  get referrerPolicy(): string {
    return this.getAttribute("referrerpolicy") ?? "no-referrer-when-downgrade";
  }
  set referrerPolicy(value: string) {
    this.setAttribute("referrerpolicy", value);
  }
  get src(): string {
    return this.getAttribute("src") ?? "";
  }
  set src(value: string) {
    this.setAttribute("src", value);
  }
  get text(): string {
    return this.textContent ?? "";
  }
  set text(value: string) {
    this.textContent = value;
  }
  get type(): string {
    return this.getAttribute("type") ?? "";
  }
  set type(value: string) {
    this.setAttribute("type", value);
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
