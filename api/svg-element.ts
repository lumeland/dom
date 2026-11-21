import { $createClone, $normalizeAttr, toDataAttrName, toDataPropName } from "./_utils.ts";

class SVGElementClass extends dom.Element {
  #dataset: Record<string, string | undefined> | null = null;

  [$createClone](): DOM.SVGElement {
    return new dom.SVGElement(this.tagName);
  }

  [$normalizeAttr](name: string): string {
    return name;
  }

  get namespaceURI(): string | null {
    return "http://www.w3.org/2000/svg";
  }

  get ownerSVGElement(): DOM.SVGElement | null {
    return this.closest("svg") ?? null;
  }

  get viewportElement(): DOM.SVGElement | null {
    return this.ownerSVGElement;
  }

  get dataset(): DOMStringMap {
    if (this.#dataset) {
      return this.#dataset;
    }

    this.#dataset = new Proxy<Record<string, string | undefined>>(
      {},
      {
        get: (_target, property) => {
          const name = toDataAttrName(String(property));
          return this.getAttribute(name) ?? undefined;
        },

        set: (_target, property, value) => {
          const name = toDataAttrName(String(property), true);
          this.setAttribute(name, String(value));
          return true;
        },

        deleteProperty: (_target, property) => {
          const name = toDataAttrName(String(property));
          this.removeAttribute(name);
          return true;
        },

        ownKeys: () =>
          this.getAttributeNames()
            .filter((name) => name.startsWith("data-"))
            .map(toDataPropName),

        getOwnPropertyDescriptor: (_target, property) => {
          if (this.hasAttribute(toDataAttrName(String(property)))) {
            return {
              writable: true,
              enumerable: true,
              configurable: true,
            };
          }
        },

        has: (_target, property) => this.hasAttribute(toDataAttrName(String(property))),
      },
    );

    return this.#dataset;
  }
  get attributeStyleMap(): StylePropertyMap {
    throw new Error("to-do");
  }
  get autofocus(): boolean {
    throw new Error("to-do");
  }
  set autofocus(value: boolean) {
    throw new Error("to-do");
  }
  get nonce(): string {
    throw new Error("to-do");
  }
  set nonce(value: string) {
    throw new Error("to-do");
  }
  get tabIndex(): number {
    throw new Error("to-do");
  }
  set tabIndex(value: number) {
    throw new Error("to-do");
  }
  get style(): CSSStyleDeclaration {
    throw new Error("to-do");
  }
  set style(cssText: string) {
    throw new Error("to-do");
  }
}

globalThis.dom.SVGElement = SVGElementClass;

declare global {
  namespace DOM {
    type SVGElement = SVGElementClass;
  }
  interface DOM {
    SVGElement: typeof SVGElementClass;
  }
}
