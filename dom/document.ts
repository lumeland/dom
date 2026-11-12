import { Node } from "./node.ts";

export class Document extends Node implements globalThis.Document {
  title: string = "";
  vlinkColor: string = "";
  alinkColor: string = "";
  bgColor: string = "";
  cookie: string = "";
  designMode: string = "";
  dir: string = "";
  domain: string = "";
  fgColor: string = "";
  linkColor: string = "";
  onfullscreenchange: ((this: Document, ev: Event) => any) | null = null;
  onfullscreenerror: ((this: Document, ev: Event) => any) | null = null;
  onpointerlockchange: ((this: Document, ev: Event) => any) | null = null;
  onpointerlockerror: ((this: Document, ev: Event) => any) | null = null;
  onreadystatechange: ((this: Document, ev: Event) => any) | null = null;
  onvisibilitychange: ((this: Document, ev: Event) => any) | null = null;

  get URL(): string {
    throw new Error("to-do");
  }
  get activeViewTransition(): ViewTransition | null {
    throw new Error("to-do");
  }
  get all(): HTMLAllCollection {
    throw new Error("to-do");
  }
  get anchors(): HTMLCollectionOf<HTMLAnchorElement> {
    throw new Error("to-do");
  }
  get applets(): HTMLCollection {
    throw new Error("to-do");
  }
  get characterSet(): string {
    throw new Error("to-do");
  }
  get charset(): string {
    throw new Error("to-do");
  }
  get compatMode(): string {
    throw new Error("to-do");
  }
  get contentType(): string {
    throw new Error("to-do");
  }
  get currentScript(): HTMLOrSVGScriptElement | null {
    throw new Error("to-do");
  }
  get defaultView(): (WindowProxy & typeof globalThis) | null {
    throw new Error("to-do");
  }
  get doctype(): DocumentType | null {
    throw new Error("to-do");
  }
  get documentElement(): HTMLElement {
    throw new Error("to-do");
  }
  get documentURI(): string {
    throw new Error("to-do");
  }
  get embeds(): HTMLCollectionOf<HTMLEmbedElement> {
    throw new Error("to-do");
  }
  get forms(): HTMLCollectionOf<HTMLFormElement> {
    throw new Error("to-do");
  }
  get fragmentDirective(): FragmentDirective {
    throw new Error("to-do");
  }
  get fullscreen(): boolean {
    throw new Error("to-do");
  }
  get fullscreenEnabled(): boolean {
    throw new Error("to-do");
  }
  get head(): HTMLHeadElement {
    throw new Error("to-do");
  }
  get body(): HTMLElement {
    throw new Error("to-do");
  }
  set body(element: HTMLElement) {
    throw new Error("to-do");
  }
  get hidden(): boolean {
    throw new Error("to-do");
  }
  get images(): HTMLCollectionOf<HTMLImageElement> {
    throw new Error("to-do");
  }
  get implementation(): DOMImplementation {
    throw new Error("to-do");
  }
  get inputEncoding(): string {
    throw new Error("to-do");
  }
  get lastModified(): string {
    throw new Error("to-do");
  }
  get links(): HTMLCollectionOf<HTMLAnchorElement | HTMLAreaElement> {
    throw new Error("to-do");
  }
  get location(): Location {
    throw new Error("to-do");
  }
  set location(href: string) {
    throw new Error("to-do");
  }
  get ownerDocument(): null {
    throw new Error("to-do");
  }
  get pictureInPictureEnabled(): boolean {
    throw new Error("to-do");
  }
  get plugins(): HTMLCollectionOf<HTMLEmbedElement> {
    throw new Error("to-do");
  }
  get readyState(): DocumentReadyState {
    throw new Error("to-do");
  }
  get referrer(): string {
    throw new Error("to-do");
  }
  get rootElement(): SVGSVGElement | null {
    throw new Error("to-do");
  }
  get scripts(): HTMLCollectionOf<HTMLScriptElement> {
    throw new Error("to-do");
  }
  get scrollingElement(): Element | null {
    throw new Error("to-do");
  }
  get timeline(): DocumentTimeline {
    throw new Error("to-do");
  }
  get visibilityState(): DocumentVisibilityState {
    throw new Error("to-do");
  }
  adoptNode<T extends Node>(node: T): T {
    throw new Error("to-do");
  }
  captureEvents(): void {
    throw new Error("to-do");
  }
  caretPositionFromPoint(
    x: number,
    y: number,
    options?: CaretPositionFromPointOptions,
  ): CaretPosition | null {
    throw new Error("to-do");
  }
  caretRangeFromPoint(x: number, y: number): Range | null {
    throw new Error("to-do");
  }
  clear(): void {
    throw new Error("to-do");
  }
  close(): void {
    throw new Error("to-do");
  }
  createAttribute(localName: string): Attr {
    throw new Error("to-do");
  }
  createAttributeNS(namespace: string | null, qualifiedName: string): Attr {
    throw new Error("to-do");
  }
  createCDATASection(data: string): CDATASection {
    throw new Error("to-do");
  }
  createComment(data: string): Comment {
    throw new Error("to-do");
  }
  createDocumentFragment(): DocumentFragment {
    throw new Error("to-do");
  }
  createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    options?: ElementCreationOptions,
  ): HTMLElementTagNameMap[K];
  createElement(tagName: string, options?: ElementCreationOptions): HTMLElement {
    throw new Error("to-do");
  }
  createElementNS(namespaceURI: "http://www.w3.org/1999/xhtml", qualifiedName: string): HTMLElement;
  createElementNS<K extends keyof SVGElementTagNameMap>(
    namespaceURI: "http://www.w3.org/2000/svg",
    qualifiedName: K,
  ): SVGElementTagNameMap[K];
  createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: string): SVGElement;
  createElementNS<K extends keyof MathMLElementTagNameMap>(
    namespaceURI: "http://www.w3.org/1998/Math/MathML",
    qualifiedName: K,
  ): MathMLElementTagNameMap[K];
  createElementNS(
    namespaceURI: "http://www.w3.org/1998/Math/MathML",
    qualifiedName: string,
  ): MathMLElement;
  createElementNS(
    namespaceURI: string | null,
    qualifiedName: string,
    options?: ElementCreationOptions,
  ): Element;
  createElementNS(
    namespace: string | null,
    qualifiedName: string,
    options?: string | ElementCreationOptions,
  ): Element {
    throw new Error("to-do");
  }
  createEvent(eventInterface: "AnimationEvent"): AnimationEvent;
  createEvent(eventInterface: "AnimationPlaybackEvent"): AnimationPlaybackEvent;
  createEvent(eventInterface: "AudioProcessingEvent"): AudioProcessingEvent;
  createEvent(eventInterface: "BeforeUnloadEvent"): BeforeUnloadEvent;
  createEvent(eventInterface: "BlobEvent"): BlobEvent;
  createEvent(eventInterface: "ClipboardEvent"): ClipboardEvent;
  createEvent(eventInterface: "CloseEvent"): CloseEvent;
  createEvent(eventInterface: "CommandEvent"): CommandEvent;
  createEvent(eventInterface: "CompositionEvent"): CompositionEvent;
  createEvent(
    eventInterface: "ContentVisibilityAutoStateChangeEvent",
  ): ContentVisibilityAutoStateChangeEvent;
  createEvent(eventInterface: "CookieChangeEvent"): CookieChangeEvent;
  createEvent(eventInterface: "CustomEvent"): CustomEvent;
  createEvent(eventInterface: "DeviceMotionEvent"): DeviceMotionEvent;
  createEvent(eventInterface: "DeviceOrientationEvent"): DeviceOrientationEvent;
  createEvent(eventInterface: "DragEvent"): DragEvent;
  createEvent(eventInterface: "ErrorEvent"): ErrorEvent;
  createEvent(eventInterface: "Event"): Event;
  createEvent(eventInterface: "Events"): Event;
  createEvent(eventInterface: "FocusEvent"): FocusEvent;
  createEvent(eventInterface: "FontFaceSetLoadEvent"): FontFaceSetLoadEvent;
  createEvent(eventInterface: "FormDataEvent"): FormDataEvent;
  createEvent(eventInterface: "GPUUncapturedErrorEvent"): GPUUncapturedErrorEvent;
  createEvent(eventInterface: "GamepadEvent"): GamepadEvent;
  createEvent(eventInterface: "HashChangeEvent"): HashChangeEvent;
  createEvent(eventInterface: "IDBVersionChangeEvent"): IDBVersionChangeEvent;
  createEvent(eventInterface: "InputEvent"): InputEvent;
  createEvent(eventInterface: "KeyboardEvent"): KeyboardEvent;
  createEvent(eventInterface: "MIDIConnectionEvent"): MIDIConnectionEvent;
  createEvent(eventInterface: "MIDIMessageEvent"): MIDIMessageEvent;
  createEvent(eventInterface: "MediaEncryptedEvent"): MediaEncryptedEvent;
  createEvent(eventInterface: "MediaKeyMessageEvent"): MediaKeyMessageEvent;
  createEvent(eventInterface: "MediaQueryListEvent"): MediaQueryListEvent;
  createEvent(eventInterface: "MediaStreamTrackEvent"): MediaStreamTrackEvent;
  createEvent(eventInterface: "MessageEvent"): MessageEvent;
  createEvent(eventInterface: "MouseEvent"): MouseEvent;
  createEvent(eventInterface: "MouseEvents"): MouseEvent;
  createEvent(eventInterface: "NavigateEvent"): NavigateEvent;
  createEvent(
    eventInterface: "NavigationCurrentEntryChangeEvent",
  ): NavigationCurrentEntryChangeEvent;
  createEvent(eventInterface: "OfflineAudioCompletionEvent"): OfflineAudioCompletionEvent;
  createEvent(eventInterface: "PageRevealEvent"): PageRevealEvent;
  createEvent(eventInterface: "PageSwapEvent"): PageSwapEvent;
  createEvent(eventInterface: "PageTransitionEvent"): PageTransitionEvent;
  createEvent(eventInterface: "PaymentMethodChangeEvent"): PaymentMethodChangeEvent;
  createEvent(eventInterface: "PaymentRequestUpdateEvent"): PaymentRequestUpdateEvent;
  createEvent(eventInterface: "PictureInPictureEvent"): PictureInPictureEvent;
  createEvent(eventInterface: "PointerEvent"): PointerEvent;
  createEvent(eventInterface: "PopStateEvent"): PopStateEvent;
  createEvent(eventInterface: "ProgressEvent"): ProgressEvent;
  createEvent(eventInterface: "PromiseRejectionEvent"): PromiseRejectionEvent;
  createEvent(eventInterface: "RTCDTMFToneChangeEvent"): RTCDTMFToneChangeEvent;
  createEvent(eventInterface: "RTCDataChannelEvent"): RTCDataChannelEvent;
  createEvent(eventInterface: "RTCErrorEvent"): RTCErrorEvent;
  createEvent(eventInterface: "RTCPeerConnectionIceErrorEvent"): RTCPeerConnectionIceErrorEvent;
  createEvent(eventInterface: "RTCPeerConnectionIceEvent"): RTCPeerConnectionIceEvent;
  createEvent(eventInterface: "RTCTrackEvent"): RTCTrackEvent;
  createEvent(eventInterface: "SecurityPolicyViolationEvent"): SecurityPolicyViolationEvent;
  createEvent(eventInterface: "SpeechRecognitionErrorEvent"): SpeechRecognitionErrorEvent;
  createEvent(eventInterface: "SpeechRecognitionEvent"): SpeechRecognitionEvent;
  createEvent(eventInterface: "SpeechSynthesisErrorEvent"): SpeechSynthesisErrorEvent;
  createEvent(eventInterface: "SpeechSynthesisEvent"): SpeechSynthesisEvent;
  createEvent(eventInterface: "StorageEvent"): StorageEvent;
  createEvent(eventInterface: "SubmitEvent"): SubmitEvent;
  createEvent(eventInterface: "TaskPriorityChangeEvent"): TaskPriorityChangeEvent;
  createEvent(eventInterface: "TextEvent"): TextEvent;
  createEvent(eventInterface: "ToggleEvent"): ToggleEvent;
  createEvent(eventInterface: "TouchEvent"): TouchEvent;
  createEvent(eventInterface: "TrackEvent"): TrackEvent;
  createEvent(eventInterface: "TransitionEvent"): TransitionEvent;
  createEvent(eventInterface: "UIEvent"): UIEvent;
  createEvent(eventInterface: "UIEvents"): UIEvent;
  createEvent(eventInterface: "WebGLContextEvent"): WebGLContextEvent;
  createEvent(eventInterface: "WheelEvent"): WheelEvent;
  createEvent(eventInterface: string): Event {
    throw new Error("to-do");
  }
  createNodeIterator(root: Node, whatToShow?: number, filter?: NodeFilter | null): NodeIterator {
    throw new Error("to-do");
  }
  createProcessingInstruction(target: string, data: string): ProcessingInstruction {
    throw new Error("to-do");
  }
  createRange(): Range {
    throw new Error("to-do");
  }
  createTextNode(data: string): Text {
    throw new Error("to-do");
  }
  createTreeWalker(root: Node, whatToShow?: number, filter?: NodeFilter | null): TreeWalker {
    throw new Error("to-do");
  }
  execCommand(commandId: string, showUI?: boolean, value?: string): boolean {
    throw new Error("to-do");
  }
  exitFullscreen(): Promise<void> {
    throw new Error("to-do");
  }
  exitPictureInPicture(): Promise<void> {
    throw new Error("to-do");
  }
  exitPointerLock(): void {
    throw new Error("to-do");
  }
  getElementById(elementId: string): HTMLElement | null {
    throw new Error("to-do");
  }
  getElementsByClassName(classNames: string): HTMLCollectionOf<Element> {
    throw new Error("to-do");
  }
  getElementsByName(elementName: string): NodeListOf<HTMLElement> {
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
  getElementsByTagNameNS(namespace: string | null, localName: string): HTMLCollectionOf<Element> {
    throw new Error("to-do");
  }
  getSelection(): Selection | null {
    throw new Error("to-do");
  }
  hasFocus(): boolean {
    throw new Error("to-do");
  }
  hasStorageAccess(): Promise<boolean> {
    throw new Error("to-do");
  }
  importNode<T extends Node>(node: T, options?: boolean | ImportNodeOptions): T {
    throw new Error("to-do");
  }
  open(unused1?: string, unused2?: string): Document;
  open(url: string | URL, name: string, features: string): WindowProxy | null {
    throw new Error("to-do");
  }
  queryCommandEnabled(commandId: string): boolean {
    throw new Error("to-do");
  }
  queryCommandIndeterm(commandId: string): boolean {
    throw new Error("to-do");
  }
  queryCommandState(commandId: string): boolean {
    throw new Error("to-do");
  }
  queryCommandSupported(commandId: string): boolean {
    throw new Error("to-do");
  }
  queryCommandValue(commandId: string): string {
    throw new Error("to-do");
  }
  releaseEvents(): void {
    throw new Error("to-do");
  }
  requestStorageAccess(): Promise<void> {
    throw new Error("to-do");
  }
  startViewTransition(
    callbackOptions?: ViewTransitionUpdateCallback | StartViewTransitionOptions,
  ): ViewTransition {
    throw new Error("to-do");
  }
  write(...text: string[]): void {
    throw new Error("to-do");
  }
  writeln(...text: string[]): void {
    throw new Error("to-do");
  }
  get textContent(): null {
    throw new Error("to-do");
  }
  addEventListener<K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    throw new Error("to-do");
  }
  removeEventListener<K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    throw new Error("to-do");
  }
}
