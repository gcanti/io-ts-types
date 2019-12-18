---
title: setFromArray.ts
nav_order: 22
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [SetFromArrayC (interface)](#setfromarrayc-interface)
- [setFromArray (function)](#setfromarray-function)

---

# SetFromArrayC (interface)

**Signature**

```ts
export interface SetFromArrayC<C extends t.Mixed> extends t.Type<Set<t.TypeOf<C>>, Array<t.OutputOf<C>>, unknown> {}
```

# setFromArray (function)

**Signature**

```ts
export function setFromArray<C extends t.Mixed>(
  codec: C,
  O: Ord<t.TypeOf<C>>,
  name: string = `Set<${codec.name}>`
): SetFromArrayC<C> { ... }
```
