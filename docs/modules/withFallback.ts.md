---
title: withFallback.ts
nav_order: 25
parent: Modules
---

# withFallback overview

Added in v0.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [withFallback](#withfallback)

---

# withFallback

Returns a clone of the given codec that always succeed using the given value `a` if the original codec fails

**Signature**

```ts
export function withFallback<C extends t.Any>(codec: C, a: t.TypeOf<C>, name = `withFallback(${codec.name})`): C { ... }
```

**Example**

```ts
import { withFallback } from 'io-ts-types/lib/withFallback'
import * as t from 'io-ts'
import { right } from 'fp-ts/lib/Either'

const T = withFallback(t.number, -1)

assert.deepStrictEqual(T.decode(1), right(1))
assert.deepStrictEqual(T.decode('a'), right(-1))
```

Added in v0.5.0
