globalThis.dom = {} as unknown as DOM;

await import("./node-list.ts");
await import("./node.ts");
await import("./parent-node.ts");
await import("./character-data.ts");
await import("./text.ts");
await import("./comment.ts");
await import("./named-node-map.ts");
await import("./attr.ts");
await import("./element.ts");
await import("./document-fragment.ts");
await import("./html-collection.ts");
await import("./html-element.ts");
await import("./html-head-element.ts");
await import("./html-template-element.ts");
await import("./document.ts");
await import("./document-type.ts");
await import("./dom-implementation.ts");
await import("./dom-token-list.ts");

dom.elements = new Map<string, { new (...args: any): DOM.Element }>([
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

declare global {
  namespace DOM {}
  interface DOM {
    elements: Map<string, { new (...args: any): DOM.Element }>;
  }
  var dom: DOM;
}

export { dom };
