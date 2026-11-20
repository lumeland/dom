import { $createClone } from "./_utils.ts";

class HTMLEmbedElementClass extends dom.HTMLElement {
  constructor() {
    super("HEAD");
  }

  [$createClone](): DOM.HTMLEmbedElement {
    return new dom.HTMLEmbedElement();
  }

  get height(): string {
    throw new Error("to-do");
  }
  set height(value: string) {
    throw new Error("to-do");
  }
  get src(): string {
    throw new Error("to-do");
  }
  set src(value: string) {
    throw new Error("to-do");
  }
  get type(): string {
    throw new Error("to-do");
  }
  set type(value: string) {
    throw new Error("to-do");
  }
  get width(): string {
    throw new Error("to-do");
  }
  set width(value: string) {
    throw new Error("to-do");
  }
  getSVGDocument(): Document | null {
    throw new Error("to-do");
  }
}

globalThis.dom.HTMLEmbedElement = HTMLEmbedElementClass;

declare global {
  namespace DOM {
    type HTMLEmbedElement = HTMLEmbedElementClass;
  }
  interface DOM {
    HTMLEmbedElement: typeof HTMLEmbedElementClass;
  }
}
