import { describe, it, expect } from "vitest";
import { DOMParser } from "../mod.ts";

const basicHtml = `<!doctype html>
<html class="dark">
  <head>
    <title class="knives">Mary had a little lamb</title>
  </head>
  <body>
    <h1>His fleece as white as snow</h1>
    And wherever <b id="b">Mary</b> went
    <a href="./lost-sheep" class="forks and knives">He was sure to go</a>
    <a class="forks and knives">He was <span>sure</span> to <span>go</span></a>
    <a>He was sure to go</a>
  </body>
</html>
`;

const parser = new DOMParser();

describe("Instances", () => {
  it("Array instanceof Array", () => {
    expect([]).toBeInstanceOf(Array);
    expect(Array.isArray([])).toBeTruthy();
  });

  it("NodeList is instanceof Array", () => {
    const nodes = parser.parseFromString(basicHtml, "text/html");
    expect(nodes.childNodes).toBeInstanceOf(Array);
    expect(Array.isArray(nodes)).toBeFalsy();
  });

  it("HTMLCollection is instanceof Array", () => {
    const nodes = parser.parseFromString(basicHtml, "text/html");
    expect(nodes.children).toBeInstanceOf(Array);
    // expect(Array.isArray(nodes.children)).toBeFalsy();
  });

  it("Nullish not instanceof NodeList", () => {
    expect(null).not.toBeInstanceOf(dom.NodeList);
    expect(undefined).not.toBeInstanceOf(dom.NodeList);
  });

  it("Nullish not instanceof HTMLCollection", () => {
    expect(null).not.toBeInstanceOf(dom.HTMLCollection);
    expect(undefined).not.toBeInstanceOf(dom.HTMLCollection);
  });

  it("Subclass instanceof Array", () => {
    class Foo extends Array {}
    expect(new Foo()).toBeInstanceOf(Array);
    expect(Array.isArray(new Foo())).toBeTruthy();
  });

  it("Array not instanceof subclass", () => {
    class Foo extends Array {}
    expect([]).not.toBeInstanceOf(Foo);
  });
});
