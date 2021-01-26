---
title: setFromArray.ts
nav_order: 25
parent: Modules
---

# setFromArray overview

Added in v0.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [SetFromArrayC (interface)](#setfromarrayc-interface)
- [setFromArray](#setfromarray)

---

# SetFromArrayC (interface)

**Signature**

```ts
export interface SetFromArrayC<C extends t.Mixed> extends t.Type<Set<t.TypeOf<C>>, Array<t.OutputOf<C>>, unknown> {}
```

Added in v0.5.0

# setFromArray

**Signature**

```ts
export function setFromArray<C extends t.Mixed>(
  codec: C,
  O: Ord<t.TypeOf<C>>,
  name: string = `Set<${codec.name}>`
): SetFromArrayC<C> { ... }
```

Added in v0.5.0
