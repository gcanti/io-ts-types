---
title: fromNullable.ts
nav_order: 14
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [fromNullable (function)](#fromnullable-function)

---

# fromNullable (function)

**Signature**

```ts
export const fromNullable = <A, O, I>(codec: t.Type<A, O, I>) => (
  a: A,
  name: string = `fromNullable(${codec.name})`
): t.Type<A, O, I | undefined | null> =>
  new t.Type(name, codec.is, (i, context) => ...
```
