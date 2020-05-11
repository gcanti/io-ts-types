---
title: Decoder/withFallback.ts
nav_order: 23
parent: Modules
---

# withFallback overview

Added in v0.6.0

---

<h2 class="text-delta">Table of contents</h2>

- [withFallback](#withfallback)

---

# withFallback

Returns a decoder that always succeed using the given value `a` if the original decoder fails

**Signature**

```ts
export function withFallback<A>(decoder: D.Decoder<A>, a: A): D.Decoder<A> { ... }
```

Added in v0.6.0
