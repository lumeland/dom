class DocumentTypeClass extends dom.Node {
  #qualifiedName: string;
  #publicId: string;
  #systemId: string;

  constructor(name: string, publicId: string, systemId: string) {
    super("html", dom.NodeType.DOCUMENT_TYPE_NODE);

    this.#qualifiedName = name;
    this.#publicId = publicId;
    this.#systemId = systemId;
  }

  get name(): string {
    return this.#qualifiedName;
  }
  get ownerDocument(): DOM.Document {
    throw new Error("to-do");
  }
  get publicId(): string {
    return this.#publicId;
  }
  get systemId(): string {
    return this.#systemId;
  }
  get textContent(): null {
    return null;
  }
}

globalThis.dom.DocumentType = DocumentTypeClass;

declare global {
  namespace DOM {
    type DocumentType = DocumentTypeClass;
  }
  interface DOM {
    DocumentType: typeof DocumentTypeClass;
  }
}
