export { parse, parseFrag } from "../api/parser.ts";
import { DOM as DOMSelector } from "../api/dom/selectors/nwsapi-types.ts";

export const $createClone = Symbol.for("createClone");
export const $parentNode = Symbol.for("parentNode");
export const $ownerDocument = Symbol.for("ownerDocument");
export const $ownerElement = Symbol.for("ownerElement");
export const $classList = Symbol.for("classList");
export const $selectorAPI = Symbol.for("selectorAPI");
export const $onChange = Symbol.for("onChange");
export const $className = Symbol.for("className");

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
    contentFrag[$ownerDocument] = ownerDocument;
    const content = nodesFromArray(data[3], ownerDocument);
    const childNodes = contentFrag.childNodes;

    for (const child of content.childNodes) {
      childNodes.push(child);
      child[$parentNode] = contentFrag;
    }

    return new dom.HTMLTemplateElement(attributes, contentFrag);
  }

  const ElementConstructor = dom.elements.get(nodeName) ?? dom.HTMLElement;
  const element = new ElementConstructor(nodeName, attributes);
  element[$ownerDocument] = ownerDocument;
  const childNodes = element.childNodes;

  for (const child of children) {
    switch (child[0]) {
      case dom.NodeType.TEXT_NODE:
        const text = new dom.Text(child[1]);
        childNodes.push(text);
        text[$parentNode] = element;
        break;

      case dom.NodeType.COMMENT_NODE:
        const comment = new dom.Comment(child[1]);
        childNodes.push(comment);
        comment[$parentNode] = element;
        break;

      case dom.NodeType.DOCUMENT_NODE:
      case dom.NodeType.ELEMENT_NODE:
        const elementChild = nodesFromArray(child, ownerDocument);
        childNodes.push(elementChild);
        elementChild[$parentNode] = element;
        break;

      case dom.NodeType.DOCUMENT_TYPE_NODE:
        const type = new dom.DocumentType(child[1], child[2], child[3]);
        childNodes.push(type);
        type[$parentNode] = element;
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
      if (!child.hasAttribute("class")) {
        continue;
      }
      if (classNames.every((className) => child.classList.contains(className))) {
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

const DATASET_REGEX = /([A-Z])/g;
export function toDataAttrName(name: string): `data-${string}` {
  return `data-${name.replaceAll(DATASET_REGEX, "-$1").toLowerCase()}`;
}

const DATASET_PROP_REGEX = /(-\w)/g;
export function toDataPropName(name: string): string {
  return name.slice(5).replaceAll(DATASET_PROP_REGEX, (match) => match.slice(1).toUpperCase());
}

export function checkAncestor(parent: DOM.Node, nodes: (DOM.Node | string)[]) {
  if (nodes.some((node) => node instanceof dom.Node && node !== parent && node.contains(parent))) {
    throw new DOMException("The new child is an ancestor of the parent");
  }
}

export class ArrayLike<T> extends Array<T> {
  [$onChange]?: () => void;

  push(...items: T[]) {
    const result = super.push(...items);
    this[$onChange]?.();
    return result;
  }

  unshift(...items: T[]) {
    const result = super.unshift(...items);
    this[$onChange]?.();
    return result;
  }

  splice(start: number, deleteCount: number, ...items: T[]) {
    const result = super.splice(start, deleteCount, ...items);
    this[$onChange]?.();
    return result;
  }
}

export function reactive(callback: (value: string | null) => void) {
  let value: string | null = null;
  let changing = false;

  return function change(newValue: string | null) {
    if (changing || value === newValue) return;
    changing = true;
    value = newValue;
    callback(value);
    changing = false;
  };
}
