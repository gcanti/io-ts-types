---
title: Decoder/fromNullable.ts
nav_order: 12
parent: Modules
---

# fromNullable overview

Added in v0.6.0

---

<h2 class="text-delta">Table of contents</h2>

- [fromNullable](#fromnullable)

---

# fromNullable

Returns a decoder that replaces a nullable input with the given value `a`

**Signature**

```ts
export function fromNullable<A>(decoder: D.Decoder<A>, a: A): D.Decoder<A> { ... }
```

Added in v0.6.0
