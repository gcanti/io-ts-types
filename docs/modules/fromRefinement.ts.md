---
title: fromRefinement.ts
nav_order: 28
parent: Modules
---

# fromRefinement overview

Added in v0.4.4

---

<h2 class="text-delta">Table of contents</h2>

- [fromRefinement](#fromrefinement)

---

# fromRefinement

Returns a codec from a refinement

**Signature**

```ts
export function fromRefinement<A>(name: string, is: (u: unknown) => u is A): t.Type<A, A, unknown> { ... }
```

Added in v0.4.4
