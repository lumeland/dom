import { dom } from "./api/dom.ts";
import { nodesFromArray, parse } from "./api/_utils.ts";

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
    const nodes = nodesFromArray(parsed, document);
    dom.HTMLDocument.fillNodes(document, nodes);
    return document;
  }
}
