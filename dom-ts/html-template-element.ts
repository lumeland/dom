class HTMLTemplateElementClass extends dom.HTMLElement {
  #content: DOM.DocumentFragment;

  constructor(attributes: [string, string][], content: DOM.DocumentFragment) {
    super("template", attributes);
    this.#content = content;
  }

  cloneNode(deep = false): DOM.HTMLTemplateElement {
    const newNode = super.cloneNode(deep) as DOM.HTMLTemplateElement;

    if (deep) {
      const content = newNode.content;
      for (const child of this.content.childNodes) {
        content.appendChild(child.cloneNode(deep));
      }
    }

    return newNode;
  }

  get content(): DOM.DocumentFragment {
    return this.#content;
  }
  get shadowRootClonable(): boolean {
    throw new Error("to-do");
  }
  set shadowRootClonable(value: boolean) {
    throw new Error("to-do");
  }
  get shadowRootCustomElementRegistry(): string {
    throw new Error("to-do");
  }
  set shadowRootCustomElementRegistry(value: string) {
    throw new Error("to-do");
  }
  get shadowRootDelegatesFocus(): boolean {
    throw new Error("to-do");
  }
  set shadowRootDelegatesFocus(value: boolean) {
    throw new Error("to-do");
  }
  get shadowRootMode(): string {
    throw new Error("to-do");
  }
  set shadowRootMode(value: string) {
    throw new Error("to-do");
  }
  get shadowRootSerializable(): boolean {
    throw new Error("to-do");
  }
  set shadowRootSerializable(value: boolean) {
    throw new Error("to-do");
  }
}

globalThis.dom.HTMLTemplateElement = HTMLTemplateElementClass;

declare global {
  namespace DOM {
    type HTMLTemplateElement = HTMLTemplateElementClass;
  }
  interface DOM {
    HTMLTemplateElement: typeof HTMLTemplateElementClass;
  }
}
