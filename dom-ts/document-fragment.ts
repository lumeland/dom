import { $createClone, type SelectorAPI, $selectorAPI, getElementById } from "./_utils.ts";

class DocumentFragmentClass extends dom.ParentNode {
  constructor() {
    super("#document-fragment", dom.NodeType.DOCUMENT_FRAGMENT_NODE);
  }

  set nodeValue(_value: string | null) {
    // Ignored
  }
  get nodeValue() {
    return null;
  }

  get [$selectorAPI](): SelectorAPI {
    const api = this.ownerDocument?.[$selectorAPI];

    if (!api) {
      throw new Error("This node must have an owner document to use the Selector API");
    }

    return api;
  }

  [$createClone](): DOM.DocumentFragment {
    return new dom.DocumentFragment();
  }

  getElementById(elementId: string): DOM.HTMLElement | null {
    return getElementById(this.childNodes, elementId);
  }
}

globalThis.dom.DocumentFragment = DocumentFragmentClass;

declare global {
  namespace DOM {
    type DocumentFragment = DocumentFragmentClass;
  }
  interface DOM {
    DocumentFragment: typeof DocumentFragmentClass;
  }
}
