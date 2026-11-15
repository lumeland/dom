// @ts-expect-error: No types
import NWDom from "./nwsapi.js";

export const DOM: (doc: DOM.Document) => {
  ancestor(
    selector: string,
    context: DOM.Element | DOM.Document,
    callback?: (element: DOM.Element) => void,
  ): DOM.Element | null;
  first(
    selector: string,
    context: DOM.Element | DOM.Document,
    callback?: (element: DOM.Element) => void,
  ): DOM.Element | null;
  match(
    selector: string,
    context: DOM.Element | DOM.Document,
    callback?: (element: DOM.Element) => void,
  ): boolean;
  select(
    selector: string,
    context: DOM.Element | DOM.Document,
    callback?: (element: DOM.Element) => void,
  ): DOM.Element[];
  byId(id: string, from: DOM.Element | DOM.Document): DOM.Element[];
  byTag(tag: string, from: DOM.Element | DOM.Document): DOM.Element[];
  byClass(tag: string, from: DOM.Element | DOM.Document): DOM.Element[];
} = NWDom as any;
