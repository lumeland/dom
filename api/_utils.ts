import { readFileSync } from "node:fs";
import * as wasm from "../wasm/dom_wasm.js";

import * as CSSSelect from "css-select";

export const $createClone = Symbol.for("createClone");
export const $parentNode = Symbol.for("parentNode");
export const $ownerDocument = Symbol.for("ownerDocument");
export const $ownerElement = Symbol.for("ownerElement");
export const $classList = Symbol.for("classList");
export const $onChange = Symbol.for("onChange");
export const $className = Symbol.for("className");

wasm.initSync({
  module: readFileSync(new URL(import.meta.resolve("../wasm/dom_wasm_bg.wasm"))),
});

export function parse(html: string): string {
  return wasm.parse(html);
}

export function parseFrag(html: string, contextLocalName?: string): string {
  return wasm.parse_frag(html, contextLocalName ?? "");
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
      node.childNodes.splice(0, node.childNodes.length);
      continue;
    }
    flat.push(node);
  }
  return flat;
}

const adapter = {
  isTag(node: DOM.Element): node is DOM.Element {
    return node.nodeType === dom.NodeType.ELEMENT_NODE;
  },
  getAttributeValue(element: DOM.Element, name: string) {
    return element.getAttribute(name) ?? undefined;
  },
  getChildren(node: DOM.Element): DOM.Element[] {
    return node.childNodes as DOM.NodeList<DOM.Element>;
  },
  getName(element: DOM.Element): string {
    return element.localName;
  },
  getParent(element: DOM.Element): DOM.Element | null {
    return element.parentNode as DOM.Element | null;
  },
  getSiblings(element: DOM.Element): DOM.Element[] {
    return (element.parentNode?.childNodes as DOM.NodeList<DOM.Element> | undefined) ?? [];
  },
  getText(node: DOM.Element): string {
    return node.textContent ?? "";
  },
  hasAttrib(element: DOM.Element, name: string): boolean {
    return element.hasAttribute(name);
  },
  removeSubsets(nodes: DOM.Element[]): DOM.Element[] {
    return nodes;
  },
};

export function selectOne<E>(query: string, element: DOM.Element): E | null {
  try {
    return CSSSelect.selectOne(query, element, { adapter }) as E;
  } catch (cause) {
    const error = new DOMException(`'${query}' is not a valid selector`);
    error.cause = cause;
    throw error;
  }
}

export function selectAll<E>(query: string, element: DOM.Element): E[] {
  try {
    return CSSSelect.selectAll(query, element, { adapter }) as E[];
  } catch (cause) {
    const error = new DOMException(`'${query}' is not a valid selector`);
    error.cause = cause;
    throw error;
  }
}

export function matches(query: string, element: DOM.Element) {
  try {
    return CSSSelect.is(element, query, { adapter });
  } catch (cause) {
    const error = new DOMException(`'${query}' is not a valid selector`);
    error.cause = cause;
    throw error;
  }
}

export const svgAttributesAliases = new Map([
  ["accentheight", "accentHeight"],
  ["alignmentbaseline", "alignmentBaseline"],
  ["allowreorder", "allowReorder"],
  ["arabicform", "arabicForm"],
  ["attributename", "attributeName"],
  ["attributetype", "attributeType"],
  ["autoreverse", "autoReverse"],
  ["basefrequency", "baseFrequency"],
  ["baseprofile", "baseProfile"],
  ["baselineshift", "baselineShift"],
  ["calcmode", "calcMode"],
  ["capheight", "capHeight"],
  ["clippath", "clipPath"],
  ["clippathunits", "clipPathUnits"],
  ["colorinterpolation", "colorInterpolation"],
  ["colorinterpolationfilters", "colorInterpolationFilters"],
  ["colorprofile", "colorProfile"],
  ["colorrendering", "colorRendering"],
  ["contentscripttype", "contentScriptType"],
  ["contentstyletype", "contentStyleType"],
  ["dominantbaseline", "dominantBaseline"],
  ["enablebackground", "enableBackground"],
  ["externalresourcesrequired", "externalResourcesRequired"],
  ["fillopacity", "fillOpacity"],
  ["fillrule", "fillRule"],
  ["filterres", "filterRes"],
  ["filterunits", "filterUnits"],
  ["floodcolor", "floodColor"],
  ["floodopacity", "floodOpacity"],
  ["fontfamily", "fontFamily"],
  ["fontsize", "fontSize"],
  ["fontsizeadjust", "fontSizeAdjust"],
  ["fontstretch", "fontStretch"],
  ["fontstyle", "fontStyle"],
  ["fontvariant", "fontVariant"],
  ["fontweight", "fontWeight"],
  ["glyphname", "glyphName"],
  ["glyphorientationhorizontal", "glyphOrientationHorizontal"],
  ["glyphorientationvertical", "glyphOrientationVertical"],
  ["glyphref", "glyphRef"],
  ["gradienttransform", "gradientTransform"],
  ["gradientunits", "gradientUnits"],
  ["horizadvx", "horizAdvX"],
  ["horizoriginx", "horizOriginX"],
  ["imagerendering", "imageRendering"],
  ["keypoints", "keyPoints"],
  ["keysplines", "keySplines"],
  ["keytimes", "keyTimes"],
  ["lengthadjust", "lengthAdjust"],
  ["letterspacing", "letterSpacing"],
  ["lightingcolor", "lightingColor"],
  ["limitingconeangle", "limitingConeAngle"],
  ["markerend", "markerEnd"],
  ["markerheight", "markerHeight"],
  ["markermid", "markerMid"],
  ["markerstart", "markerStart"],
  ["markerunits", "markerUnits"],
  ["markerwidth", "markerWidth"],
  ["maskcontentunits", "maskContentUnits"],
  ["maskunits", "maskUnits"],
  ["numoctaves", "numOctaves"],
  ["overlineposition", "overlinePosition"],
  ["overlinethickness", "overlineThickness"],
  ["paintorder", "paintOrder"],
  ["pathlength", "pathLength"],
  ["patterncontentunits", "patternContentUnits"],
  ["patterntransform", "patternTransform"],
  ["patternunits", "patternUnits"],
  ["pointerevents", "pointerEvents"],
  ["pointsatx", "pointsAtX"],
  ["pointsaty", "pointsAtY"],
  ["pointsatz", "pointsAtZ"],
  ["preservealpha", "preserveAlpha"],
  ["preserveaspectratio", "preserveAspectRatio"],
  ["primitiveunits", "primitiveUnits"],
  ["refx", "refX"],
  ["refy", "refY"],
  ["renderingintent", "renderingIntent"],
  ["repeatcount", "repeatCount"],
  ["repeatdur", "repeatDur"],
  ["requiredextensions", "requiredExtensions"],
  ["requiredfeatures", "requiredFeatures"],
  ["shaperendering", "shapeRendering"],
  ["stopcolor", "stopColor"],
  ["stopopacity", "stopOpacity"],
  ["strikethroughposition", "strikethroughPosition"],
  ["strikethroughthickness", "strikethroughThickness"],
  ["strokedasharray", "strokeDasharray"],
  ["strokedashoffset", "strokeDashoffset"],
  ["strokelinecap", "strokeLinecap"],
  ["strokelinejoin", "strokeLinejoin"],
  ["strokemiterlimit", "strokeMiterlimit"],
  ["strokeopacity", "strokeOpacity"],
  ["strokewidth", "strokeWidth"],
  ["surfacescale", "surfaceScale"],
  ["systemlanguage", "systemLanguage"],
  ["textanchor", "textAnchor"],
  ["textdecoration", "textDecoration"],
  ["textrendering", "textRendering"],
  ["transformorigin", "transformOrigin"],
  ["underlineposition", "underlinePosition"],
  ["underlinethickness", "underlineThickness"],
  ["unicodebidi", "unicodeBidi"],
  ["unicoderange", "unicodeRange"],
  ["unitsperem", "unitsPerEm"],
  ["valphabetic", "vAlphabetic"],
  ["vhanging", "vHanging"],
  ["videographic", "vIdeographic"],
  ["vmathematical", "vMathematical"],
  ["vectoreffect", "vectorEffect"],
  ["vertadvy", "vertAdvY"],
  ["vertoriginx", "vertOriginX"],
  ["vertoriginy", "vertOriginY"],
  ["viewbox", "viewBox"],
  ["viewtarget", "viewTarget"],
  ["wordspacing", "wordSpacing"],
  ["writingmode", "writingMode"],
  ["xchannelselector", "xChannelSelector"],
  ["xheight", "xHeight"],
  ["xlinkactuate", "xlinkActuate"],
  ["xlinkarcrole", "xlinkArcrole"],
  ["xlinkhref", "xlinkHref"],
  ["xlinkrole", "xlinkRole"],
  ["xlinkshow", "xlinkShow"],
  ["xlinktitle", "xlinkTitle"],
  ["xlinktype", "xlinkType"],
  ["xmlbase", "xmlBase"],
  ["xmllang", "xmlLang"],
  ["xmlspace", "xmlSpace"],
  ["ychannelselector", "yChannelSelector"],
  ["zoomandpan", "zoomAndPan"],
]);

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

export function arrayToNode(
  data: DocumentOrElementData | HTMLTemplateElementData,
  ownerDocument: DOM.Document,
): DOM.Node {
  const [, nodeName, attributes, ...children] = data;

  const element = ownerDocument.createElement(nodeName);

  if (attributes.length) {
    element.attributes.push(
      ...attributes.map(([name, value]) => {
        const attr = new dom.Attr(name);
        attr[$ownerElement] = element;
        attr.value = value;

        return attr;
      }),
    );
  }

  if (element instanceof dom.HTMLTemplateElement) {
    const content = arrayToNode((data as HTMLTemplateElementData)[3], ownerDocument);
    const childNodes = element.content.childNodes;

    for (const child of content.childNodes) {
      childNodes.push(child);
      child[$parentNode] = element.content;
    }

    element[$ownerDocument] = ownerDocument;
    return element;
  }

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
        const elementChild = arrayToNode(child, ownerDocument);
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
            case "noscript":
            case "plaintext": {
              innerHTML += (child as DOM.Text).data;
              break;
            }

            default: {
              innerHTML += escapeString((child as DOM.Text).data);
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
  return `<${parentElement.localName}${getElementAttributesString(parentElement)}>`;
}

export function getElementAttributesString(element: DOM.Element): string {
  let out = "";

  for (const attribute of element.attributes) {
    out += ` ${attribute.name}="${escapeString(attribute.value)}"`;
  }

  return out;
}

// escaping: https://html.spec.whatwg.org/multipage/parsing.html#escapingString
const NBSP_REGEX = /\xA0/g;
function escapeString(string: string): string {
  return string
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll(NBSP_REGEX, "&nbsp;")
    .replaceAll('"', "&quot;");
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
      if (child.hasAttribute("class")) {
        if (classNames.every((className) => child.classList.contains(className))) {
          search.push(child);
        }
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
const VALID_NAME =
  /^(?:[A-Za-z][^\0\t\n\f\r\u0020/>]*|[:_\u0080-\u{10FFFF}][A-Za-z0-9-.:_\u0080-\u{10FFFF}]*)$/u;
export function toDataAttrName(name: string, check = false): `data-${string}` {
  if (check && !VALID_NAME.test(name)) {
    throw new DOMException(`An invalid or illegal data attribute name was specified`);
  }
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

export function reactive(callback: (value: unknown) => void) {
  let changing = false;

  return function change(value: unknown) {
    if (changing) return;
    changing = true;
    callback(value);
    changing = false;
  };
}
