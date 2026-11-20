# @lumeland/dom

An implementation of the browser DOM—primarily for SSR. Implemented with
Rust, WASM, and TypeScript for Node.

This is a port of the [original project](https://github.com/b-fuze/deno-dom) created by b-fuse for Deno, but with many modifications:

- Ported to Node.js.
- Updated Rust libraries
- Refactor of the DOM implementation with cleaner code and more support.
- Replaced `nwsapi` with `css-select`
- Removed FFI version and provide a single WASM version.

## Example

```typescript
import { DOMParser } from "jsr:@b-fuze/deno-dom";

const doc = new DOMParser().parseFromString(
  `
    <h1>Hello World!</h1>
    <p>Hello from <a href="https://lume.land/">Lume!</a></p>
  `,
  "text/html",
);

const p = doc.querySelector("p")!;

p.innerHTML = "DOM in <b>Lume</b> is pretty cool";
console.log(p.children[0].outerHTML); // "<b>Lume</b>"
```

## Documentation

Refer to MDN (Mozilla Developer Network) for documentation. If there are
inconsistencies (that aren't a result of legacy APIs) file an issue.

# Credits

- b-fuse for the awesome original project
- html5ever developers for the HTML parser
- nwsapi developers for the selector parser
