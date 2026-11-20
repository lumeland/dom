import { $createClone } from "./_utils.ts";

class HTMLAnchorElementClass extends dom.HTMLElement {
  constructor() {
    super("A");
  }

  [$createClone](): DOM.HTMLAnchorElement {
    return new dom.HTMLAnchorElement();
  }

  get origin(): string {
    throw new Error("to-do");
  }
  get relList(): DOMTokenList {
    throw new Error("to-do");
  }
  set relList(value: string) {
    throw new Error("to-do");
  }
  toString(): string {
    return this.href;
  }
  set hash(value: string) {
    throw new Error("to-do");
  }
  get hash(): string {
    throw new Error("to-do");
  }
  set host(value: string) {
    throw new Error("to-do");
  }
  get host(): string {
    throw new Error("to-do");
  }
  set hostname(value: string) {
    throw new Error("to-do");
  }
  get hostname(): string {
    throw new Error("to-do");
  }
  set href(value: string) {
    throw new Error("to-do");
  }
  get href(): string {
    throw new Error("to-do");
  }
  set password(value: string) {
    throw new Error("to-do");
  }
  get password(): string {
    throw new Error("to-do");
  }
  set pathname(value: string) {
    throw new Error("to-do");
  }
  get pathname(): string {
    throw new Error("to-do");
  }
  set port(value: string) {
    throw new Error("to-do");
  }
  get port(): string {
    throw new Error("to-do");
  }
  set protocol(value: string) {
    throw new Error("to-do");
  }
  get protocol(): string {
    throw new Error("to-do");
  }
  set search(value: string) {
    throw new Error("to-do");
  }
  get search(): string {
    throw new Error("to-do");
  }
  set username(value: string) {
    throw new Error("to-do");
  }
  get username(): string {
    throw new Error("to-do");
  }
  set download(value: string) {
    throw new Error("to-do");
  }
  get download(): string {
    throw new Error("to-do");
  }
  set hreflang(value: string) {
    throw new Error("to-do");
  }
  get hreflang(): string {
    throw new Error("to-do");
  }
  set ping(value: string) {
    throw new Error("to-do");
  }
  get ping(): string {
    throw new Error("to-do");
  }
  set referrerPolicy(value: string) {
    throw new Error("to-do");
  }
  get referrerPolicy(): string {
    throw new Error("to-do");
  }
  set rel(value: string) {
    throw new Error("to-do");
  }
  get rel(): string {
    throw new Error("to-do");
  }
  set target(value: string) {
    throw new Error("to-do");
  }
  get target(): string {
    throw new Error("to-do");
  }
  set text(value: string) {
    throw new Error("to-do");
  }
  get text(): string {
    throw new Error("to-do");
  }
  set type(value: string) {
    throw new Error("to-do");
  }
  get type(): string {
    throw new Error("to-do");
  }
}

globalThis.dom.HTMLAnchorElement = HTMLAnchorElementClass;

declare global {
  namespace DOM {
    type HTMLAnchorElement = HTMLAnchorElementClass;
  }
  interface DOM {
    HTMLAnchorElement: typeof HTMLAnchorElementClass;
  }
}
