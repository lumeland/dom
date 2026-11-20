import { $createClone } from "./_utils.ts";

export class TextClass extends dom.CharacterData {
  constructor(text: string = "") {
    super(String(text), "#text", dom.NodeType.TEXT_NODE);
  }

  [$createClone](): DOM.Text {
    return new dom.Text(this.data);
  }

  get wholeText(): string {
    throw new Error("to-do");
  }

  splitText(_offset: number): DOM.Text {
    throw new Error("to-do");
  }
}

globalThis.dom.Text = TextClass;

declare global {
  namespace DOM {
    type Text = TextClass;
  }
  interface DOM {
    Text: typeof TextClass;
  }
}
