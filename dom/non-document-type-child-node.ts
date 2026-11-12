export class NonDocumentTypeChildNode implements globalThis.NonDocumentTypeChildNode {
  get nextElementSibling(): Element | null {
    throw new Error("to-do");
  }
  get previousElementSibling(): Element | null {
    throw new Error("to-do");
  }
}
