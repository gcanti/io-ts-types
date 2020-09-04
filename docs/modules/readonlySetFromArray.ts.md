---
title: readonlySetFromArray.ts
nav_order: 22
parent: Modules
---

# readonlySetFromArray overview

Added in v0.5.7

---

<h2 class="text-delta">Table of contents</h2>

- [ReadonlySetFromArrayC (interface)](#readonlysetfromarrayc-interface)
- [readonlySetFromArray](#readonlysetfromarray)

---

# ReadonlySetFromArrayC (interface)

**Signature**

```ts
export interface ReadonlySetFromArrayC<C extends t.Mixed>
  extends t.Type<ReadonlySet<t.TypeOf<C>>, ReadonlyArray<t.OutputOf<C>>, unknown> {}
```

Added in v0.5.7

# readonlySetFromArray

**Signature**

```ts
export function readonlySetFromArray<C extends t.Mixed>(
  codec: C,
  O: Ord<t.TypeOf<C>>,
  name: string = `ReadonlySet<${codec.name}>`
): ReadonlySetFromArrayC<C> { ... }
```

Added in v0.5.7
