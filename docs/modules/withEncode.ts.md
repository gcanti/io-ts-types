---
title: withEncode.ts
nav_order: 29
parent: Modules
---

# withEncode overview

Added in v0.5.12

---

<h2 class="text-delta">Table of contents</h2>

- [withEncode](#withencode)

---

# withEncode

Returns a clone of the given codec which uses the given `encode` function

**Signature**

```ts
export function withEncode<A, O, I, P>(
  codec: t.Type<A, O, I>,
  encode: (a: A) => P,
  name: string = codec.name
): t.Type<A, P, I> { ... }
```

**Example**

```ts
import { withEncode } from 'io-ts-types/lib/withEncode'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { right } from 'fp-ts/lib/Either'

const T = withEncode(t.number, String)

assert.deepStrictEqual(T.decode(1), right(1))
assert.deepStrictEqual(T.encode(1), '1')
assert.deepStrictEqual(PathReporter.report(T.decode('str')), ['Invalid value "str" supplied to : number'])
```

Added in v0.5.12
