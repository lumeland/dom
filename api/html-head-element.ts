class HTMLHeadElementClass extends dom.HTMLElement {
  constructor(attributes: [string, string][]) {
    super("HEAD", attributes);
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
