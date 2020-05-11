---
title: Decoder/either.ts
nav_order: 11
parent: Modules
---

# either overview

Added in v0.6.0

---

<h2 class="text-delta">Table of contents</h2>

- [either](#either)

---

# either

Given a decoder representing a type `E` and a decoder representing a type `A`, returns a decoder representing `Either<L, A>`
that is able to decode the JSON representation of an `Either`.

**Signature**

```ts
export function either<E, A>(left: D.Decoder<E>, right: D.Decoder<A>): D.Decoder<E.Either<E, A>> { ... }
```

Added in v0.6.0
