class HTMLHeadElementClass extends dom.HTMLElement {}

globalThis.dom.HTMLHeadElement = HTMLHeadElementClass;

declare global {
  namespace DOM {
    type HTMLHeadElement = HTMLHeadElementClass;
  }
  interface DOM {
    HTMLHeadElement: typeof HTMLHeadElementClass;
  }
}
