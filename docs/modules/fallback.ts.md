---
title: fallback.ts
nav_order: 7
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [fallback (function)](#fallback-function)

---

# fallback (function)

Returns a clone of the given codec that always succeed using the given value `a` if the original codec fails

**Signature**

```ts
export const fallback = <A, O, I>(codec: t.Type<A, O, I>) => (
  a: A,
  name = `fallback(${codec.name})`
): t.Type<A, O, I> => ...
```

**Example**

```ts
import { fallback } from 'io-ts-types/lib/fallback'
import * as t from 'io-ts'
import { right } from 'fp-ts/lib/Either'

const T = fallback(t.number)(-1)

assert.deepStrictEqual(T.decode(1), right(1))
assert.deepStrictEqual(T.decode('a'), right(-1))
```
