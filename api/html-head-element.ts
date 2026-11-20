class HTMLHeadElementClass extends dom.HTMLElement {
  constructor() {
    super("HEAD");
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
