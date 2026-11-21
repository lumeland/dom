import {
  $createClone,
  getElementById,
  getElementsByClassName,
  getElementsByTagName,
  getElementsByTagNameWildcard,
  $ownerDocument,
} from "./_utils.ts";

export class DocumentClass extends dom.ParentNode {
  #implementation: DOM.DOMImplementation | null = null;

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
  }

  cloneNode(subtree?: boolean): DOM.Document {
    return super.cloneNode(subtree) as DOM.Document;
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
  get anchors(): DOM.HTMLCollection<DOM.HTMLAnchorElement> {
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
  get doctype(): DOM.DocumentType | null {
    return (
      (this.childNodes.find(
        (node) => node.nodeType === dom.NodeType.DOCUMENT_TYPE_NODE,
      ) as DOM.DocumentType) ?? null
    );
  }
  get documentElement(): DOM.HTMLElement {
    return this.childNodes.find(
      (node) => node.nodeType === dom.NodeType.ELEMENT_NODE,
    ) as DOM.HTMLElement;
  }
  get documentURI(): string {
    throw new Error("to-do");
  }
  get embeds(): DOM.HTMLCollection<DOM.HTMLEmbedElement> {
    throw new Error("to-do");
  }
  get forms(): DOM.HTMLCollection<DOM.HTMLFormElement> {
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
  get images(): DOM.HTMLCollection<DOM.HTMLImageElement> {
    throw new Error("to-do");
  }
  get implementation(): DOM.DOMImplementation {
    return this.#implementation || (this.#implementation = new dom.DOMImplementation());
  }
  get inputEncoding(): string {
    throw new Error("to-do");
  }
  get lastModified(): string {
    throw new Error("to-do");
  }
  get links(): DOM.HTMLCollection<DOM.HTMLAnchorElement> {
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
  get plugins(): DOM.HTMLCollection<DOM.HTMLEmbedElement> {
    throw new Error("to-do");
  }
  get rootElement(): SVGSVGElement | null {
    throw new Error("to-do");
  }
  get scripts(): DOM.HTMLCollection<DOM.HTMLScriptElement> {
    throw new Error("to-do");
  }
  createAttribute(_localName: string): DOM.Attr {
    throw new Error("to-do");
  }
  createAttributeNS(_namespace: string | null, _qualifiedName: string): DOM.Attr {
    throw new Error("to-do");
  }
  createCDATASection(_data: string): CDATASection {
    throw new Error("to-do");
  }
  createComment(data: string): DOM.Comment {
    const comment = new dom.Comment(data);
    comment[$ownerDocument] = this;
    return comment;
  }
  createDocumentFragment(): DOM.DocumentFragment {
    const fragment = new dom.DocumentFragment();
    fragment[$ownerDocument] = this;
    return fragment;
  }
  [$createClone](): DOM.Document {
    return new dom.Document();
  }
  createElement(tagName: "template"): DOM.HTMLTemplateElement;
  createElement(tagName: string): DOM.HTMLElement;
  createElement(tagName: string): DOM.HTMLElement {
    tagName = tagName.toUpperCase();

    switch (tagName) {
      case "TEMPLATE": {
        const element = new dom.HTMLTemplateElement(new dom.DocumentFragment());
        element[$ownerDocument] = this;
        return element;
      }

      case "EMBED": {
        const element = new dom.HTMLEmbedElement();
        element[$ownerDocument] = this;
        return element;
      }

      case "FORM": {
        const element = new dom.HTMLFormElement();
        element[$ownerDocument] = this;
        return element;
      }

      case "HEAD": {
        const element = new dom.HTMLHeadElement();
        element[$ownerDocument] = this;
        return element;
      }

      case "IMG": {
        const element = new dom.HTMLImageElement();
        element[$ownerDocument] = this;
        return element;
      }

      case "SCRIPT": {
        const element = new dom.HTMLScriptElement();
        element[$ownerDocument] = this;
        return element;
      }

      default: {
        const element = new dom.HTMLElement(tagName);
        element[$ownerDocument] = this;
        return element;
      }
    }
  }
  createElementNS(
    namespace: string | null,
    qualifiedName: string,
    _options?: string | ElementCreationOptions,
  ): DOM.Element {
    switch (namespace) {
      case "http://www.w3.org/1999/xhtml":
        return this.createElement(qualifiedName);

      case "http://www.w3.org/2000/svg": {
        const element = new dom.SVGElement(qualifiedName);
        element[$ownerDocument] = this;
        return element;
      }
      default:
        throw new DOMException("Not supported namespace");
    }
  }
  createTextNode(data: string): DOM.Text {
    const node = new dom.Text(data);
    node[$ownerDocument] = this.ownerDocument;
    return node;
  }
  getElementById(elementId: string): DOM.HTMLElement | null {
    return getElementById(this.childNodes, elementId);
  }
  getElementsByClassName(classNames: string): DOM.HTMLCollection<DOM.Element> {
    return getElementsByClassName(
      this.childNodes,
      classNames.trim().split(/\s+/),
      new dom.HTMLCollection(),
    );
  }
  getElementsByName(_elementName: string): DOM.NodeList<DOM.HTMLElement> {
    throw new Error("to-do");
  }
  getElementsByTagName(qualifiedName: string): DOM.HTMLCollection<DOM.Element> {
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
    _namespace: string | null,
    _localName: string,
  ): DOM.HTMLCollection<DOM.Element> {
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
