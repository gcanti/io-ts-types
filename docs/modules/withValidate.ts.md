---
title: withValidate.ts
nav_order: 29
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [withValidate (function)](#withvalidate-function)

---

# withValidate (function)

Returns a clone of the given codec which uses the given `validate` function

**Signature**

```ts
export function withValidate<C extends t.Any>(codec: C, validate: C['validate'], name: string = codec.name): C { ... }
```

**Example**

```ts
import { withValidate } from 'io-ts-types/lib/withValidate'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { right } from 'fp-ts/lib/Either'

const T = withValidate(t.number, (u, c) => t.number.validate(u, c).map(n => n * 2))

assert.deepStrictEqual(T.decode(1), right(2))
assert.deepStrictEqual(PathReporter.report(T.decode(null)), ['Invalid value null supplied to : number'])
```

Added in v0.4.3
