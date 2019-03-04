---
title: fp-ts/createEitherFromJSON.ts
nav_order: 7
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [EitherFromJSONC (interface)](#eitherfromjsonc-interface)
- [JSONLeft (interface)](#jsonleft-interface)
- [JSONRight (interface)](#jsonright-interface)
- [JSONEither (type alias)](#jsoneither-type-alias)
- [EitherFromJSONType (class)](#eitherfromjsontype-class)
- [createEitherFromJSON (function)](#createeitherfromjson-function)

---

# EitherFromJSONC (interface)

**Signature**

```ts
export interface EitherFromJSONC<L extends t.Mixed, R extends t.Mixed>
  extends EitherFromJSONType<
    L,
    R,
    Either<t.TypeOf<L>, t.TypeOf<R>>,
    JSONEither<t.OutputOf<L>, t.OutputOf<R>>,
    t.mixed
  > {}
```

# JSONLeft (interface)

**Signature**

```ts
export interface JSONLeft<L> {
  type: 'Left'
  value: L
}
```

# JSONRight (interface)

**Signature**

```ts
export interface JSONRight<A> {
  type: 'Right'
  value: A
}
```

# JSONEither (type alias)

**Signature**

```ts
export type JSONEither<L, A> = JSONLeft<L> | JSONRight<A>
```

# EitherFromJSONType (class)

**Signature**

```ts
export class EitherFromJSONType<L, R, A, O, I> {
  constructor(
    name: string,
    is: EitherFromJSONType<L, R, A, O, I>['is'],
    validate: EitherFromJSONType<L, R, A, O, I>['validate'],
    serialize: EitherFromJSONType<L, R, A, O, I>['encode'],
    readonly left: L,
    readonly right: R
  ) { ... }
  ...
}
```

# createEitherFromJSON (function)

**Signature**

```ts
export const createEitherFromJSON = <L extends t.Mixed, R extends t.Mixed>(
  leftCodec: L,
  rightCodec: R,
  name: string = `Either<${leftCodec.name}, ${rightCodec.name}>`
): EitherFromJSONC<L, R> => ...
```

**Example**

```ts
import * as t from 'io-ts'
import { createEitherFromJSON } from 'io-ts-types/lib/fp-ts/createEitherFromJSON'
import { right, left } from 'fp-ts/lib/Either'

const T = createEitherFromJSON(t.string, t.number)
assert.deepStrictEqual(T.decode({ type: 'Left', value: 's' }), right(left('s')))
assert.deepStrictEqual(T.decode({ type: 'Right', value: 1 }), right(right(1)))
```
