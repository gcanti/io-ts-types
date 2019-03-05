---
title: fromNullable.ts
nav_order: 14
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [fromNullable (function)](#fromnullable-function)

---

# fromNullable (function)

Returns a clone of the given codec that replace a nullable input with the given value `a`

**Signature**

```ts
export const fromNullable = <A, O, I>(codec: t.Type<A, O, I>) => (
  a: A,
  name: string = `fromNullable(${codec.name})`
): t.Type<A, O, I | undefined | null> => ...
```

**Example**

```ts
import { fromNullable } from 'io-ts-types/lib/fromNullable'
import * as t from 'io-ts'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'

const T = fromNullable(t.number)(-1)

assert.deepStrictEqual(T.decode(1), right(1))
assert.deepStrictEqual(T.decode(null), right(-1))
assert.deepStrictEqual(T.decode(undefined), right(-1))
assert.deepStrictEqual(PathReporter.report(T.decode('a')), ['Invalid value "a" supplied to : fromNullable(number)'])
```
