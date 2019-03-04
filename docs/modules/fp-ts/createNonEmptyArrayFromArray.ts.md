---
title: fp-ts/createNonEmptyArrayFromArray.ts
nav_order: 8
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [NonEmptyArrayFromArrayC (interface)](#nonemptyarrayfromarrayc-interface)
- [NonEmptyArrayFromArrayType (class)](#nonemptyarrayfromarraytype-class)
- [createNonEmptyArrayFromArray (function)](#createnonemptyarrayfromarray-function)

---

# NonEmptyArrayFromArrayC (interface)

**Signature**

```ts
export interface NonEmptyArrayFromArrayC<C extends t.Mixed>
  extends NonEmptyArrayFromArrayType<C, NonEmptyArray<t.TypeOf<C>>, Array<t.OutputOf<C>>, unknown> {}
```

# NonEmptyArrayFromArrayType (class)

**Signature**

```ts
export class NonEmptyArrayFromArrayType<C, A, O, I> {
  constructor(
    name: string,
    is: NonEmptyArrayFromArrayType<C, A, O, I>['is'],
    validate: NonEmptyArrayFromArrayType<C, A, O, I>['validate'],
    serialize: NonEmptyArrayFromArrayType<C, A, O, I>['encode'],
    readonly type: C
  ) { ... }
  ...
}
```

# createNonEmptyArrayFromArray (function)

**Signature**

```ts
export const createNonEmptyArrayFromArray = <C extends t.Mixed>(
  codec: C,
  name: string = `NonEmptyArray<${codec.name}>`
): NonEmptyArrayFromArrayC<C> => ...
```

**Example**

```ts
import * as t from 'io-ts'
import { createNonEmptyArrayFromArray } from 'io-ts-types/lib/fp-ts/createNonEmptyArrayFromArray'
import { right } from 'fp-ts/lib/Either'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'

const T = createNonEmptyArrayFromArray(t.number)
assert.deepStrictEqual(T.decode([1, 2, 3]), right(new NonEmptyArray(1, [2, 3])))
```
