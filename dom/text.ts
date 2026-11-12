import { CharacterData } from "./character-data.ts";
import { Slottable } from "./slottable.ts";
import { applyMixins } from "./utils.ts";
import { NodeTypes } from "./node.ts";

const Parent = applyMixins(class extends CharacterData {}, [Slottable]);

export class Text extends Parent implements globalThis.Text {
  constructor(text: string = "") {
    super(String(text), "#text", NodeTypes.TEXT_NODE, null);
  }

  get wholeText(): string {
    throw new Error("to-do");
  }

  splitText(offset: number): Text {
    throw new Error("to-do");
  }
}
