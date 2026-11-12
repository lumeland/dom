export class NodeList<T extends Node = Node> extends Array<T> implements globalThis.NodeList {
  item(index: number): T | null {
    return this[index] ?? null;
  }
  forEach(callbackfn: (value: T, key: number, parent: NodeList<T>) => void, thisArg?: any): void {
    this.forEach((value, key) => callbackfn(value, key, this), thisArg);
  }
  override toString() {
    return "[object NodeList]";
  }
}

export class NodeListOf<T extends Node = Node>
  extends Array<T>
  implements globalThis.NodeListOf<T>
{
  item(index: number): T {
    return this[index];
  }
  forEach(callbackfn: (value: T, key: number, parent: NodeListOf<T>) => void, thisArg?: any): void {
    this.forEach((value, key) => callbackfn(value, key, this), thisArg);
  }
  override toString() {
    return "[object NodeList]";
  }
}
