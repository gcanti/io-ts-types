---
title: nonEmptyArray.ts
nav_order: 16
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [NonEmptyArrayC (interface)](#nonemptyarrayc-interface)
- [nonEmptyArray (function)](#nonemptyarray-function)

---

# NonEmptyArrayC (interface)

**Signature**

```ts
export interface NonEmptyArrayC<C extends t.Mixed>
  extends t.Type<NonEmptyArray<t.TypeOf<C>>, Array<t.OutputOf<C>>, unknown> {}
```

Added in v0.5.0

# nonEmptyArray (function)

**Signature**

```ts
export function nonEmptyArray<C extends t.Mixed>(
  codec: C,
  name: string = `NonEmptyArray<${codec.name}>`
): NonEmptyArrayC<C> { ... }
```

Added in v0.5.0
