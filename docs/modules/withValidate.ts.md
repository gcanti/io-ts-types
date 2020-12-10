---
title: withValidate.ts
nav_order: 29
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
import { pipe } from 'fp-ts/lib/function'
import { withValidate } from 'io-ts-types/lib/withValidate'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import * as E from 'fp-ts/lib/Either'

const minString = (min: number) =>
  withValidate(t.string, (u, c) =>
    pipe(
      t.string.validate(u, c),
      E.chain(x => (x.length >= min ? t.success(x) : t.failure(u, c, `string must be at least ${min} characters`)))
    )
  )

assert.deepStrictEqual(minString(3).decode('test'), E.right('test'))
assert.deepStrictEqual(PathReporter.report(minString(3).decode('te')), ['string must be at least 3 characters'])
```

Added in v0.4.3
