export { parse, parseFrag } from "../api/parser.ts";
import { DOM as DOMSelector } from "../api/dom/selectors/nwsapi-types.ts";

export const createClone = Symbol.for("createClone");
export const setParentNode = Symbol.for("setParentNode");
export const setOwnerDocument = Symbol.for("setOwnerDocument");
export const setOwnerElement = Symbol.for("setOwnerElement");
export const selectorAPI = Symbol.for("getSelector");

export type Selector = (doc: DOM.Document) => {
  first(
    selector: string,
    context: DOM.Element | DOM.Document | DOM.DocumentFragment,
    callback?: (element: DOM.Element) => void,
  ): DOM.Element | null;
  match(
    selector: string,
    context: DOM.Element | DOM.Document | DOM.DocumentFragment,
    callback?: (element: DOM.Element) => void,
  ): boolean;
  select(
    selector: string,
    context: DOM.Element | DOM.Document | DOM.DocumentFragment,
    callback?: (element: DOM.Element) => void,
  ): DOM.Element[];
};
export type SelectorAPI = ReturnType<Selector>;

export function createSelector(doc: DOM.Document): SelectorAPI {
  return DOMSelector(doc);
}

export function flatNodes(nodes: (DOM.Node | string)[]): DOM.Node[] {
  const flat: DOM.Node[] = [];
  for (const node of nodes) {
    if (typeof node === "string") {
      flat.push(new dom.Text(node));
      continue;
    }
    if (node instanceof dom.DocumentFragment) {
      flat.push(...node.childNodes);
      continue;
    }
    flat.push(node);
  }
  return flat;
}

const voidElements = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

const validHTMLElementNames = new Map<string, { new (...args: any): DOM.Element }>([
  ["html", dom.HTMLElement],
  ["base", dom.HTMLElement],
  ["head", dom.HTMLElement],
  ["link", dom.HTMLElement],
  ["meta", dom.HTMLElement],
  ["style", dom.HTMLElement],
  ["title", dom.HTMLElement],
  ["body", dom.HTMLElement],
  ["address", dom.HTMLElement],
  ["article", dom.HTMLElement],
  ["aside", dom.HTMLElement],
  ["footer", dom.HTMLElement],
  ["header", dom.HTMLElement],
  ["h1", dom.HTMLElement],
  ["h2", dom.HTMLElement],
  ["h3", dom.HTMLElement],
  ["h4", dom.HTMLElement],
  ["h5", dom.HTMLElement],
  ["h6", dom.HTMLElement],
  ["main", dom.HTMLElement],
  ["nav", dom.HTMLElement],
  ["section", dom.HTMLElement],
  ["blockquote", dom.HTMLElement],
  ["dd", dom.HTMLElement],
  ["div", dom.HTMLElement],
  ["dl", dom.HTMLElement],
  ["dt", dom.HTMLElement],
  ["figcaption", dom.HTMLElement],
  ["figure", dom.HTMLElement],
  ["hr", dom.HTMLElement],
  ["li", dom.HTMLElement],
  ["menu", dom.HTMLElement],
  ["ol", dom.HTMLElement],
  ["p", dom.HTMLElement],
  ["pre", dom.HTMLElement],
  ["ul", dom.HTMLElement],
  ["a", dom.HTMLElement],
  ["abbr", dom.HTMLElement],
  ["b", dom.HTMLElement],
  ["bdi", dom.HTMLElement],
  ["bdo", dom.HTMLElement],
  ["br", dom.HTMLElement],
  ["cite", dom.HTMLElement],
  ["code", dom.HTMLElement],
  ["data", dom.HTMLElement],
  ["dfn", dom.HTMLElement],
  ["em", dom.HTMLElement],
  ["i", dom.HTMLElement],
  ["kbd", dom.HTMLElement],
  ["mark", dom.HTMLElement],
  ["q", dom.HTMLElement],
  ["rp", dom.HTMLElement],
  ["rt", dom.HTMLElement],
  ["ruby", dom.HTMLElement],
  ["s", dom.HTMLElement],
  ["samp", dom.HTMLElement],
  ["small", dom.HTMLElement],
  ["span", dom.HTMLElement],
  ["strong", dom.HTMLElement],
  ["sub", dom.HTMLElement],
  ["sup", dom.HTMLElement],
  ["time", dom.HTMLElement],
  ["u", dom.HTMLElement],
  ["var", dom.HTMLElement],
  ["wbr", dom.HTMLElement],
  ["area", dom.HTMLElement],
  ["audio", dom.HTMLElement],
  ["img", dom.HTMLElement],
  ["map", dom.HTMLElement],
  ["track", dom.HTMLElement],
  ["video", dom.HTMLElement],
  ["embed", dom.HTMLElement],
  ["iframe", dom.HTMLElement],
  ["object", dom.HTMLElement],
  ["picture", dom.HTMLElement],
  ["portal", dom.HTMLElement],
  ["source", dom.HTMLElement],
  ["canvas", dom.HTMLElement],
  ["noscript", dom.HTMLElement],
  ["script", dom.HTMLElement],
  ["del", dom.HTMLElement],
  ["ins", dom.HTMLElement],
  ["caption", dom.HTMLElement],
  ["col", dom.HTMLElement],
  ["colgroup", dom.HTMLElement],
  ["table", dom.HTMLElement],
  ["tbody", dom.HTMLElement],
  ["td", dom.HTMLElement],
  ["tfoot", dom.HTMLElement],
  ["th", dom.HTMLElement],
  ["thead", dom.HTMLElement],
  ["tr", dom.HTMLElement],
  ["button", dom.HTMLElement],
  ["datalist", dom.HTMLElement],
  ["fieldset", dom.HTMLElement],
  ["form", dom.HTMLElement],
  ["input", dom.HTMLElement],
  ["label", dom.HTMLElement],
  ["legend", dom.HTMLElement],
  ["optgroup", dom.HTMLElement],
  ["option", dom.HTMLElement],
  ["output", dom.HTMLElement],
  ["progresss", dom.HTMLElement],
  ["select", dom.HTMLElement],
  ["textarea", dom.HTMLElement],
  ["details", dom.HTMLElement],
  ["dialog", dom.HTMLElement],
  ["summary", dom.HTMLElement],
  ["slot", dom.HTMLElement],
  ["template", dom.HTMLTemplateElement],
  ["svg", dom.HTMLElement],
  ["math", dom.HTMLElement],
]);

type DocumentData = [
  nodeType: typeof dom.NodeType.DOCUMENT_TYPE_NODE,
  nodeName: string,
  publicId: string,
  systemId: string,
];
type TextOrCommentData = [
  nodeType: typeof dom.NodeType.TEXT_NODE | typeof dom.NodeType.COMMENT_NODE,
  content: string,
];
type DocumentOrElementData = [
  nodeType: typeof dom.NodeType.DOCUMENT_NODE | typeof dom.NodeType.ELEMENT_NODE,
  nodeName: string,
  attributes: [string, string][],
  ...children: Data[],
];
type HTMLTemplateElementData = [
  nodeType: typeof dom.NodeType.ELEMENT_NODE,
  nodeName: "template",
  attributes: [string, string][],
  children: [
    nodeType: typeof dom.NodeType.DOCUMENT_NODE,
    nodeName: string,
    attributes: [string, string][],
    ...children: Data[],
  ],
];
type Data = DocumentOrElementData | TextOrCommentData | DocumentData | HTMLTemplateElementData;

function isTemplateElement(data: Data): data is HTMLTemplateElementData {
  return data[0] === dom.NodeType.ELEMENT_NODE && data[1].toLowerCase() === "template";
}

// export function fragmentNodesFromString(html: string, contextLocalName: string): DOM.Node {
//   const parsed = JSON.parse(parseFrag(html, contextLocalName));
//   return nodesFromArray(parsed);
// }

export function nodesFromArray(
  data: DocumentOrElementData | HTMLTemplateElementData,
  ownerDocument: DOM.Document | null = null,
): DOM.Node {
  const [, nodeName, attributes, ...children] = data;

  if (isTemplateElement(data)) {
    const contentFrag = new dom.DocumentFragment();
    const content = nodesFromArray(data[3]);
    const childNodes = contentFrag.childNodes;

    for (const child of content.childNodes) {
      childNodes.push(child);
      child[setParentNode](contentFrag);
    }

    return new dom.HTMLTemplateElement(attributes, contentFrag);
  }

  const ElementConstructor = validHTMLElementNames.get(nodeName) ?? dom.Element;
  const element = new ElementConstructor(nodeName, attributes);
  element[setOwnerDocument](ownerDocument);
  const childNodes = element.childNodes;

  for (const child of children) {
    switch (child[0]) {
      case dom.NodeType.TEXT_NODE:
        const text = new dom.Text(child[1]);
        childNodes.push(text);
        text[setParentNode](element);
        break;

      case dom.NodeType.COMMENT_NODE:
        const comment = new dom.Comment(child[1]);
        childNodes.push(comment);
        comment[setParentNode](element);
        break;

      case dom.NodeType.DOCUMENT_NODE:
      case dom.NodeType.ELEMENT_NODE:
        const elementChild = nodesFromArray(child, ownerDocument);
        childNodes.push(elementChild);
        elementChild[setParentNode](element);
        break;

      case dom.NodeType.DOCUMENT_TYPE_NODE:
        const type = new dom.DocumentType(child[1], child[2], child[3]);
        childNodes.push(type);
        type[setParentNode](element);
        break;
    }
  }

  return element;
}

/**
 * .innerHTML/.outerHTML implementation without recursion to avoid stack
 * overflows
 */
export function getOuterOrInnerHtml(parentElement: DOM.Element, asOuterHtml: boolean): string {
  let outerHTMLOpeningTag = "";
  let outerHTMLClosingTag = "";
  let innerHTML = "";

  if (asOuterHtml) {
    outerHTMLOpeningTag = getOuterHTMLOpeningTag(parentElement);
    outerHTMLClosingTag = `</${parentElement.localName}>`;

    if (voidElements.has(parentElement.localName)) {
      return outerHTMLOpeningTag;
    }
  }

  const initialChildNodes =
    parentElement.localName === "template"
      ? (parentElement as DOM.HTMLTemplateElement).content.childNodes
      : parentElement.childNodes;
  const childNodeDepth = [initialChildNodes];
  const indexDepth = [0];
  const closingTagDepth = [outerHTMLClosingTag];
  let depth = 0;

  depthLoop: while (depth > -1) {
    const child = childNodeDepth[depth][indexDepth[depth]];

    if (child) {
      switch (child.nodeType) {
        case dom.NodeType.ELEMENT_NODE: {
          innerHTML += getOuterHTMLOpeningTag(child as DOM.Element);
          const childLocalName = (child as DOM.Element).localName;

          // Void elements don't have a closing tag nor print innerHTML
          if (!voidElements.has(childLocalName)) {
            if (childLocalName === "template") {
              childNodeDepth.push((child as DOM.HTMLTemplateElement).content.childNodes);
            } else {
              childNodeDepth.push(child.childNodes);
            }
            indexDepth.push(0);
            closingTagDepth.push(`</${childLocalName}>`);
            depth++;
            continue depthLoop;
          }
          break;
        }

        case dom.NodeType.COMMENT_NODE:
          innerHTML += `<!--${(child as DOM.Comment).data}-->`;
          break;

        case dom.NodeType.TEXT_NODE:
          // Special handling for rawtext-like elements.
          switch ((child.parentNode! as DOM.Element).localName) {
            case "style":
            case "script":
            case "xmp":
            case "iframe":
            case "noembed":
            case "noframes":
            case "plaintext": {
              innerHTML += (child as DOM.Text).data;
              break;
            }

            case "noscript": {
              innerHTML += (child as DOM.Text).data;
              break;
            }

            default: {
              // escaping: https://html.spec.whatwg.org/multipage/parsing.html#escapingString
              innerHTML += (child as DOM.Text).data
                .replace(/&/g, "&amp;")
                .replace(/\xA0/g, "&nbsp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;");
              break;
            }
          }
          break;
      }
    } else {
      depth--;

      indexDepth.pop();
      childNodeDepth.pop();
      innerHTML += closingTagDepth.pop();
    }

    // Go to next child
    indexDepth[depth]++;
  }

  // If innerHTML is requested then the opening tag should be an empty string
  return outerHTMLOpeningTag + innerHTML;
}

function getOuterHTMLOpeningTag(parentElement: DOM.Element) {
  return "<" + parentElement.localName + getElementAttributesString(parentElement) + ">";
}

export function getElementAttributesString(element: DOM.Element): string {
  let out = "";

  for (const attribute of element.attributes) {
    // attribute names should already all be lower-case
    out += ` ${attribute.name}`;

    // escaping: https://html.spec.whatwg.org/multipage/parsing.html#escapingString
    out += `="${attribute.value
      .replace(/&/g, "&amp;")
      .replace(/\xA0/g, "&nbsp;")
      .replace(/"/g, "&quot;")}"`;
  }

  return out;
}

export function getElementsByTagNameWildcard(
  nodeList: DOM.NodeList,
  search: DOM.HTMLCollection,
): DOM.HTMLCollection {
  for (const child of nodeList) {
    if (isElement(child)) {
      search.push(child);
      getElementsByTagNameWildcard(child.childNodes, search);
    }
  }

  return search;
}

export function getElementsByTagName(
  nodeList: DOM.NodeList,
  tagName: string,
  search: DOM.HTMLCollection,
): DOM.HTMLCollection {
  for (const child of nodeList) {
    if (isElement(child)) {
      if (child.tagName === tagName) {
        search.push(child);
      }

      getElementsByTagName(child.childNodes, tagName, search);
    }
  }

  return search;
}

export function getElementById(nodeList: DOM.NodeList, id: string): DOM.HTMLElement | null {
  for (const child of nodeList) {
    if (isElement(child)) {
      if (child.id === id) {
        return child as DOM.HTMLElement;
      }

      const found = getElementById(child.childNodes, id);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

export function getElementsByClassName(
  nodeList: DOM.NodeList,
  classNames: string[],
  search: DOM.HTMLCollection,
): DOM.HTMLCollection {
  for (const child of nodeList) {
    if (isElement(child)) {
      let matchesCount = 0;

      for (const singleClassName of classNames) {
        if (child.classList.contains(singleClassName)) {
          matchesCount++;
        }
      }

      // ensure that all class names are present
      if (matchesCount === classNames.length) {
        search.push(child);
      }

      getElementsByClassName(child.childNodes, classNames, search);
    }
  }

  return search;
}

export function isElement(node: DOM.Node): node is DOM.Element {
  return node.nodeType === dom.NodeType.ELEMENT_NODE;
}
