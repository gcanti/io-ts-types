---
title: fallback.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [fallback (function)](#fallback-function)

---

# fallback (function)

**Signature**

```ts
export const fallback = <A, O, I>(codec: t.Type<A, O, I>) => (
  a: A,
  name = `fallback(${codec.name})`
): t.Type<A, O, I> => ...
```
