const SPACE_REGEX = /\s+/;

class DOMTokenListClass extends Array<string> implements DOMTokenList {
  get value(): string {
    return this.join(" ");
  }
  set value(tokens: string) {
    this.splice(0, this.length, ...tokens.trim().split(SPACE_REGEX));
  }
  toString(): string {
    return this.value;
  }
  add(...tokens: string[]): void {
    for (const token of tokens) {
      if (!this.contains(token)) {
        this.push(token);
      }
    }
  }
  contains(token: string): boolean {
    return this.includes(token);
  }
  item(index: number): string | null {
    return this[index] ?? null;
  }
  remove(...tokens: string[]): void {
    for (const token of tokens) {
      const index = this.indexOf(token);
      if (index !== -1) {
        this.splice(index, 1);
      }
    }
  }
  replace(token: string, newToken: string): boolean {
    const index = this.indexOf(token);
    if (index === -1) {
      return false;
    }

    this[index] = newToken;
    return true;
  }
  supports(_token: string): boolean {
    return true;
  }
  toggle(token: string, force?: boolean): boolean {
    const index = this.indexOf(token);
    if (force === true) {
      if (index === -1) {
        this.push(token);
      }
      return true;
    }

    if (force === false) {
      if (index !== -1) {
        this.splice(index, 1);
      }
      return false;
    }

    if (index === -1) {
      this.push(token);
      return true;
    }

    this.splice(index, 1);
    return false;
  }

  forEach(
    callbackfn: (value: string, key: number, parent: DOM.DOMTokenList) => void,
    thisArg?: any,
  ): void {
    this.forEach((value, key) => callbackfn(value, key, this), thisArg);
  }
}

globalThis.dom.DOMTokenList = DOMTokenListClass;

declare global {
  namespace DOM {
    type DOMTokenList = DOMTokenListClass;
  }
  interface DOM {
    DOMTokenList: typeof DOMTokenListClass;
  }
}
