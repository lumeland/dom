import {
  $createClone,
  $ownerDocument,
  $parentNode,
  getOuterOrInnerHtml,
  nodesFromArray,
  parseFrag,
} from "./_utils.ts";

class HTMLTemplateElementClass extends dom.HTMLElement {
  #content: DOM.DocumentFragment;

  constructor(attributes: [string, string][], content: DOM.DocumentFragment) {
    super("template", attributes);
    this.#content = content;
  }

  [$createClone](): DOM.HTMLTemplateElement {
    return new dom.HTMLTemplateElement([], new dom.DocumentFragment());
  }

  set [$ownerDocument](ownerDocument: DOM.Document | null) {
    super[$ownerDocument] = ownerDocument;
    this.#content[$ownerDocument] = ownerDocument;
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

  get innerHTML(): string {
    return getOuterOrInnerHtml(this, false);
  }
  set innerHTML(value: string) {
    const childNodes = this.#content.childNodes;

    for (const child of childNodes) {
      child[$parentNode] = null;
    }
    childNodes.splice(0, childNodes.length);

    if (!value.length) {
      return;
    }

    const parsed = JSON.parse(parseFrag(value, this.localName));
    const nodes = Array.from(nodesFromArray(parsed, this.ownerDocument).childNodes[0].childNodes);

    for (const child of nodes) {
      child[$parentNode] = this;
    }
    childNodes.push(...nodes);
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
