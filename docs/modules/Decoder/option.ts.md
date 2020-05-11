---
title: Decoder/option.ts
nav_order: 18
parent: Modules
---

# option overview

Added in v0.6.0

---

<h2 class="text-delta">Table of contents</h2>

- [option](#option)

---

# option

Given a decoder representing a type `A`, returns a decoder representing `Option<A>` that is able to decode
the JSON representation of an `Option`.

**Signature**

```ts
export function option<A>(value: D.Decoder<A>): D.Decoder<O.Option<A>> { ... }
```

Added in v0.6.0
