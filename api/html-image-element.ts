import { $createClone } from "./_utils.ts";

class HTMLImageElementClass extends dom.HTMLElement {
  constructor() {
    super("IMG");
  }

  [$createClone](): DOM.HTMLImageElement {
    return new dom.HTMLImageElement();
  }

  get complete(): boolean {
    throw new Error("to-do");
  }
  get currentSrc(): string {
    throw new Error("to-do");
  }
  get naturalHeight(): number {
    throw new Error("to-do");
  }
  get naturalWidth(): number {
    throw new Error("to-do");
  }
  get x(): number {
    throw new Error("to-do");
  }
  get y(): number {
    throw new Error("to-do");
  }
  get alt(): string {
    throw new Error("to-do");
  }
  set alt(value: string) {
    throw new Error("to-do");
  }
  get crossOrigin(): string | null {
    throw new Error("to-do");
  }
  set crossOrigin(value: string | null) {
    throw new Error("to-do");
  }
  get decoding(): "async" | "sync" | "auto" {
    throw new Error("to-do");
  }
  set decoding(value: "async" | "sync" | "auto") {
    throw new Error("to-do");
  }
  get fetchPriority(): "high" | "low" | "auto" {
    throw new Error("to-do");
  }
  set fetchPriority(value: "high" | "low" | "auto") {
    throw new Error("to-do");
  }
  get height(): number {
    throw new Error("to-do");
  }
  set height(value: number) {
    throw new Error("to-do");
  }
  get isMap(): boolean {
    throw new Error("to-do");
  }
  set isMap(value: boolean) {
    throw new Error("to-do");
  }
  get loading(): "eager" | "lazy" {
    throw new Error("to-do");
  }
  set loading(value: "eager" | "lazy") {
    throw new Error("to-do");
  }
  get referrerPolicy(): string {
    throw new Error("to-do");
  }
  set referrerPolicy(value: string) {
    throw new Error("to-do");
  }
  get sizes(): string {
    throw new Error("to-do");
  }
  set sizes(value: string) {
    throw new Error("to-do");
  }
  get src(): string {
    throw new Error("to-do");
  }
  set src(value: string) {
    throw new Error("to-do");
  }
  get srcset(): string {
    throw new Error("to-do");
  }
  set srcset(value: string) {
    throw new Error("to-do");
  }
  get useMap(): string {
    throw new Error("to-do");
  }
  set useMap(value: string) {
    throw new Error("to-do");
  }
  get width(): number {
    throw new Error("to-do");
  }
  set width(value: number) {
    throw new Error("to-do");
  }
  decode(): Promise<void> {
    throw new Error("to-do");
  }
}

globalThis.dom.HTMLImageElement = HTMLImageElementClass;

declare global {
  namespace DOM {
    type HTMLImageElement = HTMLImageElementClass;
  }
  interface DOM {
    HTMLImageElement: typeof HTMLImageElementClass;
  }
}
