const dom = {} as unknown as DOM;
globalThis.dom = dom;

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

declare global {
  namespace DOM {}
  interface DOM {
    elements: Map<string, { new (...args: any): DOM.Element }>;
  }
  var dom: DOM;
}

export { dom };
