---
title: fromRefinement.ts
nav_order: 11
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [fromRefinement (function)](#fromrefinement-function)

---

# fromRefinement (function)

Returns a codec from a refinement

**Signature**

```ts
export function fromRefinement<A>(name: string, is: (u: unknown) => u is A): t.Type<A, A, unknown> { ... }
```

Added in v0.4.4
