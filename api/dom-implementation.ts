import { $ownerDocument } from "./_utils.ts";

class DOMImplementationClass {
  createDocument(
    namespace: string | null,
    qualifiedName: string | null,
    doctype?: DOM.DocumentType | null,
  ): DOM.HTMLDocument {
    if (namespace && namespace !== "http://www.w3.org/1999/xhtml") {
      throw new DOMException(`Namespace "${namespace}" unimplemented`);
    }
    if (qualifiedName && qualifiedName !== "html") {
      throw new DOMException(`Qualified name "${qualifiedName}" unimplemented`);
    }

    const doc = new dom.HTMLDocument();
    doctype ??= new dom.DocumentType("html", "", "");

    doctype[$ownerDocument] = doc;
    doc.appendChild(doctype);
    return doc;
  }
  createDocumentType(name: string, publicId: string, systemId: string): DOM.DocumentType {
    return new dom.DocumentType(name, publicId, systemId);
  }
  createHTMLDocument(title?: string): DOM.Document {
    const doc = this.createDocument(null, null);

    const html = new dom.HTMLElement("html");
    html[$ownerDocument] = doc;
    doc.appendChild(html);

    const head = new dom.HTMLHeadElement();
    const titleEl = new dom.Element("title");
    titleEl.appendChild(new dom.Text(title ?? ""));
    head.appendChild(titleEl);
    html.appendChild(head);

    const body = new dom.Element("body");
    body.append(head, body);
    return doc;
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
