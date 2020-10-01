---
title: fromNewtype.ts
nav_order: 10
parent: Modules
---

# fromNewtype overview

Added in v0.5.2

---

<h2 class="text-delta">Table of contents</h2>

- [fromNewtype](#fromnewtype)

---

# fromNewtype

Returns a codec from a newtype

**Signature**

```ts
export function fromNewtype<N extends AnyNewtype = never>(
  codec: t.Type<CarrierOf<N>, t.OutputOf<CarrierOf<N>>>,
  name = `fromNewtype(${codec.name})`
): t.Type<N, CarrierOf<N>, unknown> { ... }
```

**Example**

```ts
import { fromNewtype } from 'io-ts-types/lib/fromNewtype'
import * as t from 'io-ts'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { Newtype, iso } from 'newtype-ts'

interface Token extends Newtype<{ readonly Token: unique symbol }, string> {}

const T = fromNewtype<Token>(t.string)

assert.deepStrictEqual(T.decode('sometoken'), right(iso<Token>().wrap('sometoken')))
assert.deepStrictEqual(PathReporter.report(T.decode(42)), ['Invalid value 42 supplied to : fromNewtype(string)'])
```

Added in v0.5.2
