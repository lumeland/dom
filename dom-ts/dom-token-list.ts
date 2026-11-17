import { ArrayLike } from "./_utils.ts";

const SPACE_REGEX = /\s+/;

class DOMTokenListClass extends ArrayLike<string> {
  get value(): string {
    return this.join(" ");
  }
  set value(tokens: string) {
    tokens = tokens.trim();
    const newTokens = tokens ? Array.from(new Set(tokens.split(SPACE_REGEX))) : [];

    // Change only if it's different
    if (
      this.length !== newTokens.length ||
      this.filter((token) => newTokens.includes(token)).length !== this.length
    ) {
      this.splice(0, this.length, ...newTokens);
    }
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
    return this[Number.isInteger(index) ? Math.trunc(index) : 0] ?? null;
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

    if (this.includes(newToken)) {
      this.splice(index, 1);
    } else {
      this[index] = newToken;
    }
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
    super.forEach((value, key) => callbackfn(value, key, this), thisArg);
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
