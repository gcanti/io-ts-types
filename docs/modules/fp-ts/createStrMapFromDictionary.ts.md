---
title: fp-ts/createStrMapFromDictionary.ts
nav_order: 13
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [StrMapC (interface)](#strmapc-interface)
- [StrMapType (class)](#strmaptype-class)
- [createStrMapFromDictionary (function)](#createstrmapfromdictionary-function)

---

# StrMapC (interface)

**Signature**

```ts
export interface StrMapC<C extends t.Mixed>
  extends StrMapType<C, StrMap<t.TypeOf<C>>, Record<string, t.OutputOf<C>>, unknown> {}
```

# StrMapType (class)

**Signature**

```ts
export class StrMapType<C, A, O, I> {
  constructor(
    name: string,
    is: StrMapType<C, A, O, I>['is'],
    validate: StrMapType<C, A, O, I>['validate'],
    serialize: StrMapType<C, A, O, I>['encode'],
    readonly type: C
  ) { ... }
  ...
}
```

# createStrMapFromDictionary (function)

**Signature**

```ts
export const createStrMapFromDictionary = <C extends t.Mixed>(
  codec: C,
  name: string = `StrMap<${codec.name}>`
): StrMapC<C> => ...
```

**Example**

```ts
import * as t from 'io-ts'
import { createStrMapFromDictionary } from 'io-ts-types/lib/fp-ts/createStrMapFromDictionary'
import { right } from 'fp-ts/lib/Either'
import { StrMap } from 'fp-ts/lib/StrMap'

const T = createStrMapFromDictionary(t.number)

assert.deepStrictEqual(T.decode({ someNumber: 42 }), right(new StrMap({ someNumber: 42 })))
assert.deepStrictEqual(T.encode(new StrMap({ someNumber: 42 })), { someNumber: 42 })
```
