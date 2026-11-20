import { $createClone } from "./_utils.ts";

class HTMLHeadElementClass extends dom.HTMLElement {
  constructor() {
    super("HEAD");
  }

  [$createClone](): DOM.HTMLHeadElement {
    return new dom.HTMLHeadElement();
  }
}

globalThis.dom.HTMLHeadElement = HTMLHeadElementClass;

declare global {
  namespace DOM {
    type HTMLHeadElement = HTMLHeadElementClass;
  }
  interface DOM {
    HTMLHeadElement: typeof HTMLHeadElementClass;
  }
}
