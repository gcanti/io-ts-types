---
title: fp-ts/createSetFromArray.ts
nav_order: 11
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [SetFromArrayC (interface)](#setfromarrayc-interface)
- [SetFromArrayType (class)](#setfromarraytype-class)
- [createSetFromArray (function)](#createsetfromarray-function)

---

# SetFromArrayC (interface)

**Signature**

```ts
export interface SetFromArrayC<C extends t.Mixed>
  extends SetFromArrayType<C, Set<t.TypeOf<C>>, Array<t.OutputOf<C>>, unknown> {}
```

# SetFromArrayType (class)

**Signature**

```ts
export class SetFromArrayType<C, A, O, I> {
  constructor(
    name: string,
    is: SetFromArrayType<C, A, O, I>['is'],
    validate: SetFromArrayType<C, A, O, I>['validate'],
    serialize: SetFromArrayType<C, A, O, I>['encode'],
    readonly type: C,
    readonly ordA: Ord<t.TypeOf<C>>
  ) { ... }
  ...
}
```

# createSetFromArray (function)

**Signature**

```ts
export const createSetFromArray = <C extends t.Mixed>(
  codec: C,
  ordA: Ord<t.TypeOf<C>>,
  name: string = `Set<${codec.name}>`
): SetFromArrayC<C> => ...
```

**Example**

```ts
import * as t from 'io-ts'
import { ordNumber } from 'fp-ts/lib/Ord'
import { createSetFromArray } from 'io-ts-types/lib/fp-ts/createSetFromArray'
import { right } from 'fp-ts/lib/Either'

const T = createSetFromArray(t.number, ordNumber)

assert.deepStrictEqual(T.decode([1, 2, 3]), right(new Set([1, 2, 3])))
```
