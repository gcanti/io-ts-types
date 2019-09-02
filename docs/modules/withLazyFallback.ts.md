---
title: withLazyFallback.ts
nav_order: 23
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [withLazyFallback (function)](#withlazyfallback-function)

---

# withLazyFallback (function)

Returns a clone of the given codec that always succeed using the given value `a` if the original codec fails

**Signature**

```ts
export function withLazyFallback<C extends t.Any>(
  codec: C,
  a: () => t.TypeOf<C>,
  name = `withLazyFallback(${codec.name})`
): C { ... }
```

**Example**

```ts
import { withLazyFallback } from 'io-ts-types/lib/withLazyFallback'
import * as t from 'io-ts'
import { right } from 'fp-ts/lib/Either'

const T = withLazyFallback(t.number, () => -1)

assert.deepStrictEqual(T.decode(1), right(1))
assert.deepStrictEqual(T.decode('a'), right(-1))
```

Added in v0.5.0
