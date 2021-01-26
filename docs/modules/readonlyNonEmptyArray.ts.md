---
title: readonlyNonEmptyArray.ts
nav_order: 22
parent: Modules
---

# readonlyNonEmptyArray overview

Added in v0.5.7

---

<h2 class="text-delta">Table of contents</h2>

- [ReadonlyNonEmptyArray (interface)](#readonlynonemptyarray-interface)
- [ReadonlyNonEmptyArrayC (interface)](#readonlynonemptyarrayc-interface)
- [readonlyNonEmptyArray](#readonlynonemptyarray)

---

# ReadonlyNonEmptyArray (interface)

**Signature**

```ts
export interface ReadonlyNonEmptyArray<A> extends ReadonlyArray<A> {
  readonly 0: A
}
```

Added in v0.5.7

# ReadonlyNonEmptyArrayC (interface)

**Signature**

```ts
export interface ReadonlyNonEmptyArrayC<C extends t.Mixed>
  extends t.Type<ReadonlyNonEmptyArray<t.TypeOf<C>>, ReadonlyArray<t.OutputOf<C>>, unknown> {}
```

Added in v0.5.7

# readonlyNonEmptyArray

**Signature**

```ts
export function readonlyNonEmptyArray<C extends t.Mixed>(
  codec: C,
  name: string = `ReadonlyNonEmptyArray<${codec.name}>`
): ReadonlyNonEmptyArrayC<C> { ... }
```

Added in v0.5.7
