import {
  createClone,
  createSelector,
  getElementById,
  getElementsByClassName,
  getElementsByTagName,
  getElementsByTagNameWildcard,
  selectorAPI,
  type SelectorAPI,
  setOwnerDocument,
} from "./_utils.ts";

export class DocumentClass extends dom.ParentNode {
  #selector: SelectorAPI | null = null;

  static fillNodes(document: DOM.HTMLDocument, node: DOM.Node) {
    for (const child of Array.from(node.childNodes)) {
      document.appendChild(child);

      if (child instanceof dom.DocumentType) {
        document.#doctype = child;
        continue;
      }
    }

    if (!document.#doctype) {
      const docType = new dom.DocumentType("html", "", "");
      if (document.childNodes.length === 0) {
        document.appendChild(docType);
      } else {
        document.insertBefore(docType, document.childNodes[0]);
      }
    }
  }

  #doctype: DOM.DocumentType | null = null;

  vlinkColor: string = "";
  alinkColor: string = "";
  bgColor: string = "";
  cookie: string = "";
  designMode: string = "";
  dir: string = "";
  domain: string = "";
  fgColor: string = "";
  linkColor: string = "";

  constructor() {
    super("#document", dom.NodeType.DOCUMENT_NODE);
    //this.implementation = new DOMImplementation();
  }

  get [selectorAPI](): SelectorAPI {
    return this.#selector ?? (this.#selector = createSelector(this));
  }

  set nodeValue(_value: string | null) {
    // Ignored
  }
  get nodeValue() {
    return null;
  }

  get title(): string {
    return this.querySelector("title")?.textContent || "";
  }
  set title(value: string) {
    let titleElement = this.querySelector("title");
    if (!titleElement) {
      const { head } = this;
      if (!head) return;

      titleElement = this.createElement("title");
      head.appendChild(titleElement);
    }

    titleElement.textContent = value;
  }

  get URL(): string {
    throw new Error("to-do");
  }
  get all(): HTMLAllCollection {
    throw new Error("to-do");
  }
  get anchors(): HTMLCollectionOf<HTMLAnchorElement> {
    throw new Error("to-do");
  }
  get applets(): DOM.HTMLCollection {
    throw new Error("to-do");
  }
  get characterSet(): string {
    throw new Error("to-do");
  }
  get charset(): string {
    throw new Error("to-do");
  }
  get compatMode(): string {
    return "CSS1Compat";
  }
  get contentType(): string {
    return "text/html";
  }
  get currentScript(): HTMLOrSVGScriptElement | null {
    throw new Error("to-do");
  }
  get doctype(): DocumentType | null {
    throw new Error("to-do");
  }
  get documentElement(): DOM.HTMLElement {
    return this.childNodes.find(
      (node) => node.nodeType === dom.NodeType.ELEMENT_NODE,
    ) as DOM.HTMLElement;
  }
  get documentURI(): string {
    throw new Error("to-do");
  }
  get embeds(): HTMLCollectionOf<HTMLEmbedElement> {
    throw new Error("to-do");
  }
  get forms(): HTMLCollectionOf<HTMLFormElement> {
    throw new Error("to-do");
  }
  get head(): DOM.HTMLHeadElement | null {
    return (
      (this.documentElement?.childNodes.find(
        (node) => node.nodeType === dom.NodeType.ELEMENT_NODE && node.nodeName === "HEAD",
      ) as DOM.HTMLHeadElement) ?? null
    );
  }
  get body(): DOM.HTMLElement | null {
    return (
      (this.documentElement?.childNodes.find(
        (node) => node.nodeType === dom.NodeType.ELEMENT_NODE && node.nodeName === "BODY",
      ) as DOM.HTMLHeadElement) ?? null
    );
  }
  set body(body: DOM.HTMLElement) {
    throw new Error("to-do");
  }
  get hidden(): boolean {
    throw new Error("to-do");
  }
  get images(): DOM.HTMLCollectionOf<HTMLImageElement> {
    throw new Error("to-do");
  }
  get implementation(): DOMImplementation {
    throw new Error("to-do");
  }
  get inputEncoding(): string {
    throw new Error("to-do");
  }
  get lastModified(): string {
    throw new Error("to-do");
  }
  get links(): DOM.HTMLCollectionOf<HTMLAnchorElement | HTMLAreaElement> {
    throw new Error("to-do");
  }
  get location(): Location {
    throw new Error("to-do");
  }
  set location(href: string) {
    throw new Error("to-do");
  }
  get pictureInPictureEnabled(): boolean {
    throw new Error("to-do");
  }
  get plugins(): DOM.HTMLCollectionOf<HTMLEmbedElement> {
    throw new Error("to-do");
  }
  get rootElement(): SVGSVGElement | null {
    throw new Error("to-do");
  }
  get scripts(): HTMLCollectionOf<HTMLScriptElement> {
    throw new Error("to-do");
  }
  createAttribute(localName: string): DOM.Attr {
    throw new Error("to-do");
  }
  createAttributeNS(namespace: string | null, qualifiedName: string): DOM.Attr {
    throw new Error("to-do");
  }
  createCDATASection(data: string): CDATASection {
    throw new Error("to-do");
  }
  createComment(data: string): DOM.Comment {
    const comment = new dom.Comment(data);
    comment[setOwnerDocument](this);
    return comment;
  }
  createDocumentFragment(): DOM.DocumentFragment {
    const fragment = new dom.DocumentFragment();
    fragment[setOwnerDocument](this);
    return fragment;
  }
  [createClone](): DOM.Document {
    return new dom.Document();
  }
  createElement(tagName: string): DOM.HTMLElement {
    tagName = tagName.toUpperCase();

    switch (tagName) {
      case "TEMPLATE": {
        const content = new dom.DocumentFragment();
        const element = new dom.HTMLTemplateElement([], content);
        element[setOwnerDocument](this);
        return element;
      }

      default: {
        const element = new dom.HTMLElement(tagName, []);
        element[setOwnerDocument](this);
        return element;
      }
    }
  }
  createElementNS(
    namespaceURI: "http://www.w3.org/1999/xhtml",
    qualifiedName: string,
  ): DOM.HTMLElement;
  createElementNS<K extends keyof SVGElementTagNameMap>(
    namespaceURI: "http://www.w3.org/2000/svg",
    qualifiedName: K,
  ): SVGElementTagNameMap[K];
  createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: string): SVGElement;
  createElementNS<K extends keyof MathMLElementTagNameMap>(
    namespaceURI: "http://www.w3.org/1998/Math/MathML",
    qualifiedName: K,
  ): MathMLElementTagNameMap[K];
  createElementNS(
    namespaceURI: "http://www.w3.org/1998/Math/MathML",
    qualifiedName: string,
  ): MathMLElement;
  createElementNS(
    namespaceURI: string | null,
    qualifiedName: string,
    options?: ElementCreationOptions,
  ): DOM.Element;
  createElementNS(
    namespace: string | null,
    qualifiedName: string,
    options?: string | ElementCreationOptions,
  ): DOM.Element {
    throw new Error("to-do");
  }
  createTextNode(data: string): DOM.Text {
    const node = new dom.Text(data);
    node[setOwnerDocument](this.ownerDocument);
    return node;
  }
  getElementById(elementId: string): DOM.HTMLElement | null {
    return getElementById(this.documentElement.childNodes, elementId);
  }
  getElementsByClassName(classNames: string): DOM.HTMLCollectionOf<DOM.Element> {
    return getElementsByClassName(
      this.documentElement.childNodes,
      classNames.trim().split(/\s+/),
      new dom.HTMLCollection(),
    );
  }
  getElementsByName(elementName: string): DOM.NodeList<DOM.HTMLElement> {
    throw new Error("to-do");
  }
  getElementsByTagName<K extends keyof HTMLElementTagNameMap>(
    qualifiedName: K,
  ): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
  getElementsByTagName<K extends keyof SVGElementTagNameMap>(
    qualifiedName: K,
  ): HTMLCollectionOf<SVGElementTagNameMap[K]>;
  getElementsByTagName<K extends keyof MathMLElementTagNameMap>(
    qualifiedName: K,
  ): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
  getElementsByTagName(qualifiedName: string): DOM.HTMLCollectionOf<DOM.Element> {
    if (qualifiedName === "*") {
      return getElementsByTagNameWildcard(this.childNodes, new dom.HTMLCollection());
    }

    return getElementsByTagName(
      this.childNodes,
      qualifiedName.toUpperCase(),
      new dom.HTMLCollection(),
    );
  }
  getElementsByTagNameNS(
    namespaceURI: "http://www.w3.org/1999/xhtml",
    localName: string,
  ): DOM.HTMLCollectionOf<DOM.HTMLElement>;
  getElementsByTagNameNS(
    namespaceURI: "http://www.w3.org/2000/svg",
    localName: string,
  ): DOM.HTMLCollectionOf<DOM.SVGElement>;
  getElementsByTagNameNS(
    namespaceURI: "http://www.w3.org/1998/Math/MathML",
    localName: string,
  ): DOM.HTMLCollectionOf<MathMLElement>;
  getElementsByTagNameNS(
    namespace: string | null,
    localName: string,
  ): DOM.HTMLCollectionOf<DOM.Element> {
    throw new Error("to-do");
  }
  get textContent(): null {
    throw new Error("to-do");
  }
}

globalThis.dom.Document = DocumentClass;
globalThis.dom.HTMLDocument = DocumentClass;

declare global {
  namespace DOM {
    type Document = DocumentClass;
    type HTMLDocument = DocumentClass;
  }
  interface DOM {
    Document: typeof DocumentClass;
    HTMLDocument: typeof DocumentClass;
  }
}
