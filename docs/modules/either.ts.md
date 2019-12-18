---
title: either.ts
nav_order: 8
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [EitherC (interface)](#eitherc-interface)
- [either (function)](#either-function)

---

# EitherC (interface)

**Signature**

```ts
export interface EitherC<L extends t.Mixed, R extends t.Mixed>
  extends t.Type<Either<t.TypeOf<L>, t.TypeOf<R>>, Either<t.OutputOf<L>, t.OutputOf<R>>, unknown> {}
```

Added in v0.5.0

# either (function)

Given a codec representing a type `L` and a codec representing a type `A`, returns a codec representing `Either<L, A>` that is able to deserialize
the JSON representation of an `Either`.

**Signature**

```ts
export function either<L extends t.Mixed, R extends t.Mixed>(
  leftCodec: L,
  rightCodec: R,
  name: string = `Either<${leftCodec.name}, ${rightCodec.name}>`
): EitherC<L, R> { ... }
```

**Example**

```ts
import { either } from 'io-ts-types/lib/either'
import { left, right } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'

const T = either(t.string, t.number)

assert.deepStrictEqual(T.decode(right(1)), right(right(1)))
assert.deepStrictEqual(T.decode(left('a')), right(left('a')))
assert.deepStrictEqual(PathReporter.report(T.decode(right('a'))), [
  'Invalid value "a" supplied to : Either<string, number>/1: Right<string>/right: number'
])
```

Added in v0.5.0
