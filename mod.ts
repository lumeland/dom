declare global {
  namespace DOM {}
  interface DOM {}
  var dom: DOM;
}

const dom = {} as unknown as DOM;
globalThis.dom = dom;

await import("./api/node-list.ts");
await import("./api/node.ts");
await import("./api/parent-node.ts");
await import("./api/character-data.ts");
await import("./api/text.ts");
await import("./api/comment.ts");
await import("./api/named-node-map.ts");
await import("./api/attr.ts");
await import("./api/element.ts");
await import("./api/document-fragment.ts");
await import("./api/html-element.ts");
await import("./api/html-anchor-element.ts");
await import("./api/html-embed-element.ts");
await import("./api/html-form-element.ts");
await import("./api/html-collection.ts");
await import("./api/html-head-element.ts");
await import("./api/html-image-element.ts");
await import("./api/html-script-element.ts");
await import("./api/html-template-element.ts");
await import("./api/document.ts");
await import("./api/document-type.ts");
await import("./api/dom-implementation.ts");
await import("./api/dom-token-list.ts");

import { arrayToNode, parse } from "./api/_utils.ts";

export { dom };

export type DOMParserMimeType =
  | "text/html"
  | "text/xml"
  | "application/xml"
  | "application/xhtml+xml"
  | "image/svg+xml";

export class DOMParser {
  parseFromString(source: string, mimeType: DOMParserMimeType): DOM.HTMLDocument {
    if (mimeType !== "text/html") {
      throw new Error(`DOMParser: "${mimeType}" unimplemented`);
    }

    const document = new dom.HTMLDocument();
    const parsed = JSON.parse(parse(source));
    const nodes = arrayToNode(parsed, document);
    document.append(...nodes.childNodes);

    if (!document.doctype) {
      document.prepend(new dom.DocumentType("html", "", ""));
    }

    return document;
  }
}
