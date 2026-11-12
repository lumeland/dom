import { Node, NodeTypes } from "./node.ts";
import { ChildNode } from "./child-node.ts";
import { ParentNode } from "./parent-node.ts";
import { ARIAMixin } from "./aria-mixin.ts";
import { Slottable } from "./slottable.ts";
import { NonDocumentTypeChildNode } from "./non-document-type-child-node.ts";
import { applyMixins } from "./utils.ts";
import { NamedNodeMap } from "./named-node-map.ts";

const Parent = applyMixins(class extends Node {}, [
  ChildNode,
  ParentNode,
  ARIAMixin,
  Slottable,
  NonDocumentTypeChildNode,
]);

export class Element extends Parent implements globalThis.Element {
  #attributes: NamedNodeMap | null = null;

  constructor(tagName: string, parentNode: Node | null, attributes: [string, string][]) {
    super(tagName.toUpperCase(), NodeTypes.ELEMENT_NODE, parentNode);

    if (attributes.length) {
      this.#attributes = new NamedNodeMap(attributes, this);
    }
  }

  animate(
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions,
  ): Animation {
    throw new Error("to-do");
  }
  getAnimations(options?: GetAnimationsOptions): Animation[] {
    throw new Error("to-do");
  }
  get attributes(): NamedNodeMap {
    return this.#attributes ?? (this.#attributes = new NamedNodeMap([], this));
  }
  get classList(): DOMTokenList {
    throw new Error("to-do");
  }
  set classList(value: string) {
    throw new Error("to-do");
  }
  get className(): string {
    throw new Error("to-do");
  }
  set className(value: string) {
    throw new Error("to-do");
  }
  get clientHeight(): number {
    throw new Error("to-do");
  }
  get clientLeft(): number {
    throw new Error("to-do");
  }
  get clientTop(): number {
    throw new Error("to-do");
  }
  get clientWidth(): number {
    throw new Error("to-do");
  }
  get currentCSSZoom(): number {
    throw new Error("to-do");
  }
  get customElementRegistry(): CustomElementRegistry | null {
    throw new Error("to-do");
  }
  get localName(): string {
    throw new Error("to-do");
  }
  get namespaceURI(): string | null {
    throw new Error("to-do");
  }
  get ownerDocument(): Document {
    throw new Error("to-do");
  }
  get prefix(): string | null {
    throw new Error("to-do");
  }
  get scrollHeight(): number {
    throw new Error("to-do");
  }
  get scrollWidth(): number {
    throw new Error("to-do");
  }
  get shadowRoot(): ShadowRoot | null {
    throw new Error("to-do");
  }
  get tagName(): string {
    throw new Error("to-do");
  }
  get id(): string {
    throw new Error("to-do");
  }
  set id(value: string) {
    throw new Error("to-do");
  }
  get innerHTML(): string {
    throw new Error("to-do");
  }
  set innerHTML(value: string) {
    throw new Error("to-do");
  }
  get outerHTML(): string {
    throw new Error("to-do");
  }
  set outerHTML(value: string) {
    throw new Error("to-do");
  }
  get scrollLeft(): number {
    throw new Error("to-do");
  }
  set scrollLeft(value: number) {
    throw new Error("to-do");
  }
  get scrollTop(): number {
    throw new Error("to-do");
  }
  set scrollTop(value: number) {
    throw new Error("to-do");
  }
  get slot(): string {
    throw new Error("to-do");
  }
  set slot(value: string) {
    throw new Error("to-do");
  }
  get textContent(): string {
    throw new Error("to-do");
  }
  set textContent(value: string | null) {
    throw new Error("to-do");
  }
  get part(): DOMTokenList {
    throw new Error("to-do");
  }
  set part(value: string) {
    throw new Error("to-do");
  }
  onfullscreenchange: ((this: globalThis.Element, ev: Event) => any) | null = null;
  onfullscreenerror: ((this: globalThis.Element, ev: Event) => any) | null = null;
  attachShadow(init: ShadowRootInit): ShadowRoot {
    throw new Error("to-do");
  }
  checkVisibility(options?: CheckVisibilityOptions): boolean {
    throw new Error("to-do");
  }
  closest<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
  closest<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
  closest<K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
  closest<E extends Element = Element>(selectors: string): E | null {
    throw new Error("to-do");
  }
  computedStyleMap(): StylePropertyMapReadOnly {
    throw new Error("to-do");
  }
  getAttribute(qualifiedName: string): string | null {
    throw new Error("to-do");
  }
  getAttributeNS(namespace: string | null, localName: string): string | null {
    throw new Error("to-do");
  }
  getAttributeNames(): string[] {
    throw new Error("to-do");
  }
  getAttributeNode(qualifiedName: string): Attr | null {
    throw new Error("to-do");
  }
  getAttributeNodeNS(namespace: string | null, localName: string): Attr | null {
    throw new Error("to-do");
  }
  getBoundingClientRect(): DOMRect {
    throw new Error("to-do");
  }
  getClientRects(): DOMRectList {
    throw new Error("to-do");
  }
  getElementsByClassName(classNames: string): HTMLCollectionOf<Element> {
    throw new Error("to-do");
  }
  getElementsByTagName<K extends keyof HTMLElementTagNameMap>(
    qualifiedName: K,
  ): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
  getElementsByTagName<K extends keyof SVGElementTagNameMap>(
    qualifiedName: K,
  ): HTMLCollectionOf<SVGElementTagNameMap[K]>;
  getElementsByTagName<K extends keyof MathMLElementTagNameMap>(
    qualifiedName: K,
  ): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
  getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element> {
    throw new Error("to-do");
  }
  getElementsByTagNameNS(
    namespaceURI: "http://www.w3.org/1999/xhtml",
    localName: string,
  ): HTMLCollectionOf<HTMLElement>;
  getElementsByTagNameNS(
    namespaceURI: "http://www.w3.org/2000/svg",
    localName: string,
  ): HTMLCollectionOf<SVGElement>;
  getElementsByTagNameNS(
    namespaceURI: "http://www.w3.org/1998/Math/MathML",
    localName: string,
  ): HTMLCollectionOf<MathMLElement>;
  getElementsByTagNameNS(
    namespace: string | null,
    localName: string,
  ): HTMLCollectionOf<globalThis.Element> {
    throw new Error("to-do");
  }
  getHTML(options?: GetHTMLOptions): string {
    throw new Error("to-do");
  }
  hasAttribute(qualifiedName: string): boolean {
    throw new Error("to-do");
  }
  hasAttributeNS(namespace: string | null, localName: string): boolean {
    throw new Error("to-do");
  }
  hasAttributes(): boolean {
    throw new Error("to-do");
  }
  hasPointerCapture(pointerId: number): boolean {
    throw new Error("to-do");
  }
  insertAdjacentElement(where: InsertPosition, element: Element): Element | null {
    throw new Error("to-do");
  }
  insertAdjacentHTML(position: InsertPosition, string: string): void {
    throw new Error("to-do");
  }
  insertAdjacentText(where: InsertPosition, data: string): void {
    throw new Error("to-do");
  }
  matches<K extends keyof HTMLElementTagNameMap>(selectors: K): this is HTMLElementTagNameMap[K];
  matches<K extends keyof SVGElementTagNameMap>(selectors: K): this is SVGElementTagNameMap[K];
  matches<K extends keyof MathMLElementTagNameMap>(
    selectors: K,
  ): this is MathMLElementTagNameMap[K];
  matches(selectors: string): boolean {
    throw new Error("to-do");
  }
  releasePointerCapture(pointerId: number): void {
    throw new Error("to-do");
  }
  removeAttribute(qualifiedName: string): void {
    throw new Error("to-do");
  }
  removeAttributeNS(namespace: string | null, localName: string): void {
    throw new Error("to-do");
  }
  removeAttributeNode(attr: Attr): Attr {
    throw new Error("to-do");
  }
  requestFullscreen(options?: FullscreenOptions): Promise<void> {
    throw new Error("to-do");
  }
  requestPointerLock(options?: PointerLockOptions): Promise<void> {
    throw new Error("to-do");
  }
  scroll(): void {
    throw new Error("to-do");
  }
  scrollBy(): void {
    throw new Error("to-do");
  }
  scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void {
    throw new Error("to-do");
  }
  scrollTo(): void {
    throw new Error("to-do");
  }
  setAttribute(qualifiedName: string, value: string): void {
    throw new Error("to-do");
  }
  setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void {
    throw new Error("to-do");
  }
  setAttributeNode(attr: Attr): Attr | null {
    throw new Error("to-do");
  }
  setAttributeNodeNS(attr: Attr): Attr | null {
    throw new Error("to-do");
  }
  setHTMLUnsafe(html: string): void {
    throw new Error("to-do");
  }
  setPointerCapture(pointerId: number): void {
    throw new Error("to-do");
  }
  toggleAttribute(qualifiedName: string, force?: boolean): boolean {
    throw new Error("to-do");
  }
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    throw new Error("to-do");
  }
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    throw new Error("to-do");
  }
  webkitMatchesSelector(selectors: string): boolean {
    throw new Error("to-do");
  }
}
