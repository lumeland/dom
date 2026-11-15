class DOMImplementationClass {
  createDocument(
    namespace: string | null,
    qualifiedName: string | null,
    doctype?: DocumentType | null,
  ): XMLDocument {
    throw new Error("to-do");
  }
  createDocumentType(name: string, publicId: string, systemId: string): DOM.DocumentType {
    return new dom.DocumentType(name, publicId, systemId);
  }
  createHTMLDocument(title?: string): DOM.Document {
    throw new Error("to-do");
  }
}

globalThis.dom.DOMImplementation = DOMImplementationClass;

declare global {
  namespace DOM {
    type DOMImplementation = DOMImplementationClass;
  }
  interface DOM {
    DOMImplementation: typeof DOMImplementationClass;
  }
}
