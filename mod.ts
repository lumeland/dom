import { dom } from "./api/dom.ts";
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
