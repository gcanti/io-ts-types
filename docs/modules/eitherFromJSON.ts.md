---
title: eitherFromJSON.ts
nav_order: 7
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [EitherFromJSONC (interface)](#eitherfromjsonc-interface)
- [JSONEither (type alias)](#jsoneither-type-alias)
- [eitherFromJSON (function)](#eitherfromjson-function)

---

# EitherFromJSONC (interface)

**Signature**

```ts
export interface EitherFromJSONC<L extends t.Mixed, R extends t.Mixed>
  extends t.Type<Either<t.TypeOf<L>, t.TypeOf<R>>, JSONEither<t.OutputOf<L>, t.OutputOf<R>>, unknown> {}
```

# JSONEither (type alias)

**Signature**

```ts
export type JSONEither<L, A> = { _tag: 'Left'; value: L } | { _tag: 'Right'; value: A }
```

# eitherFromJSON (function)

Given a codec representing a type `L` and a codec representing a type `A`, returns a codec representing `Either<L, A>` that is able to deserialize
the JSON representation of an `Either`.

**Signature**

```ts
export function eitherFromJSON<L extends t.Mixed, R extends t.Mixed>(
  leftCodec: L,
  rightCodec: R,
  name: string = `Either<${leftCodec.name}, ${rightCodec.name}>`
): EitherFromJSONC<L, R> { ... }
```

**Example**

```ts
import { eitherFromJSON } from 'io-ts-types/lib/eitherFromJSON'
import { Either, left, right } from 'fp-ts/lib/Either'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'

const toJSON = <L, A>(ma: Either<L, A>): unknown => JSON.parse(JSON.stringify(ma))

const T = eitherFromJSON(t.string, t.number)

assert.deepStrictEqual(T.decode(toJSON(right(1))), right(right(1)))
assert.deepStrictEqual(T.decode(toJSON(left('a'))), right(left('a')))
assert.deepStrictEqual(PathReporter.report(T.decode(right('a'))), [
  'Invalid value "a" supplied to : Either<string, number>/value: number'
])
```

Added in v0.4.4
