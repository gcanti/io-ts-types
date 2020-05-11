---
title: withValidate.ts
nav_order: 48
parent: Modules
---

# withValidate overview

Added in v0.4.3

---

<h2 class="text-delta">Table of contents</h2>

- [withValidate](#withvalidate)

---

# withValidate

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
import { either, right } from 'fp-ts/lib/Either'

const T = withValidate(t.number, (u, c) => either.map(t.number.validate(u, c), n => n * 2))

assert.deepStrictEqual(T.decode(1), right(2))
assert.deepStrictEqual(PathReporter.report(T.decode(null)), ['Invalid value null supplied to : number'])
```

Added in v0.4.3
