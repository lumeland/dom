import { $createClone, toDataAttrName, toDataPropName } from "./_utils.ts";

class HTMLElementClass extends dom.Element {
  #dataset: Record<string, string | undefined> | null = null;

  [$createClone](): DOM.HTMLElement {
    return new dom.HTMLElement(this.tagName, []);
  }

  get accessKey(): string {
    throw new Error("to-do");
  }
  set accessKey(value: string) {
    throw new Error("to-do");
  }
  get autocapitalize(): string {
    throw new Error("to-do");
  }
  set autocapitalize(value: string) {
    throw new Error("to-do");
  }
  get autocorrect(): boolean {
    throw new Error("to-do");
  }
  set autocorrect(value: boolean) {
    throw new Error("to-do");
  }
  get dir(): string {
    throw new Error("to-do");
  }
  set dir(value: string) {
    throw new Error("to-do");
  }
  get draggable(): boolean {
    throw new Error("to-do");
  }
  set draggable(value: boolean) {
    throw new Error("to-do");
  }
  get hidden(): boolean | "until-found" {
    throw new Error("to-do");
  }
  set hidden(value: boolean | "until-found") {
    throw new Error("to-do");
  }
  get inert(): boolean {
    throw new Error("to-do");
  }
  set inert(value: boolean) {
    throw new Error("to-do");
  }
  get innerText(): string {
    return this.textContent ?? "";
  }
  set innerText(value: string) {
    this.textContent = value;
  }
  get lang(): string {
    throw new Error("to-do");
  }
  set lang(value: string) {
    throw new Error("to-do");
  }
  get outerText(): string {
    throw new Error("to-do");
  }
  set outerText(value: string) {
    throw new Error("to-do");
  }
  get popover(): string | null {
    throw new Error("to-do");
  }
  set popover(value: string | null) {
    throw new Error("to-do");
  }
  get spellcheck(): boolean {
    throw new Error("to-do");
  }
  set spellcheck(value: boolean) {
    throw new Error("to-do");
  }
  get title(): string {
    throw new Error("to-do");
  }
  set title(value: string) {
    throw new Error("to-do");
  }
  get translate(): boolean {
    throw new Error("to-do");
  }
  set translate(value: boolean) {
    throw new Error("to-do");
  }
  get writingSuggestions(): string {
    throw new Error("to-do");
  }
  set writingSuggestions(value: string) {
    throw new Error("to-do");
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
          const name = toDataAttrName(String(property));
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
  get isContentEditable(): boolean {
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
  get contentEditable(): string {
    throw new Error("to-do");
  }
  set contentEditable(value: string) {
    throw new Error("to-do");
  }
  get enterKeyHint(): string {
    throw new Error("to-do");
  }
  set enterKeyHint(value: string) {
    throw new Error("to-do");
  }
  get inputMode(): string {
    throw new Error("to-do");
  }
  set inputMode(value: string) {
    throw new Error("to-do");
  }

  get style(): CSSStyleDeclaration {
    throw new Error("to-do");
  }

  set style(cssText: string) {
    throw new Error("to-do");
  }
}

globalThis.dom.HTMLElement = HTMLElementClass;

declare global {
  namespace DOM {
    type HTMLElement = HTMLElementClass;
  }
  interface DOM {
    HTMLElement: typeof HTMLElementClass;
  }
}
