export class Slottable implements globalThis.Slottable {
  get assignedSlot(): HTMLSlotElement | null {
    throw new Error("to-do");
  }
}
