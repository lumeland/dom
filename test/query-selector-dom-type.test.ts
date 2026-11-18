import { describe, it } from "vitest";
import { DOMParser } from "../mod.ts";

// oxlint-disable no-unused-expressions
describe("Query selector", () => {
  it("querySelector<T> and querySelectorAll<T> typings", () => {
    const doc = new DOMParser().parseFromString(`<template></template>`, "text/html");

    // We don't actually test anything here, we just challenge the TypeScript typings
    doc.querySelector<DOM.HTMLTemplateElement>("template")!.content;
  });
});
