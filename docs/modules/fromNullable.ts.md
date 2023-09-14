---
title: fromNullable.ts
nav_order: 12
parent: Modules
---

# fromNullable overview

Added in v0.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [fromNullable](#fromnullable)

---

# fromNullable

Returns a clone of the given codec that replace a nullable input with the given value `a`

**Signature**

```ts
export function fromNullable<C extends t.Mixed>(codec: C, a: t.TypeOf<C>, name = `fromNullable(${codec.name})`): C { ... }
```

**Example**

```ts
import { fromNullable } from 'io-ts-types/lib/fromNullable'
import * as t from 'io-ts'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'

const T = fromNullable(t.number, -1)

assert.deepStrictEqual(T.decode(1), right(1))
assert.deepStrictEqual(T.decode(null), right(-1))
assert.deepStrictEqual(T.decode(undefined), right(-1))
assert.deepStrictEqual(PathReporter.report(T.decode('a')), ['Invalid value "a" supplied to : fromNullable(number)'])
```

Added in v0.5.0
