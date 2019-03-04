---
title: fp-ts/createOptionFromNullable.ts
nav_order: 10
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [OptionFromNullableC (interface)](#optionfromnullablec-interface)
- [OptionFromNullableType (class)](#optionfromnullabletype-class)
- [createOptionFromNullable (function)](#createoptionfromnullable-function)

---

# OptionFromNullableC (interface)

**Signature**

```ts
export interface OptionFromNullableC<C extends t.Mixed>
  extends OptionFromNullableType<C, Option<t.TypeOf<C>>, t.OutputOf<C> | null, t.mixed> {}
```

# OptionFromNullableType (class)

**Signature**

```ts
export class OptionFromNullableType<C, A, O, I> {
  constructor(
    name: string,
    is: OptionFromNullableType<C, A, O, I>['is'],
    validate: OptionFromNullableType<C, A, O, I>['validate'],
    serialize: OptionFromNullableType<C, A, O, I>['encode'],
    readonly type: C
  ) { ... }
  ...
}
```

# createOptionFromNullable (function)

**Signature**

```ts
export const createOptionFromNullable = <C extends t.Mixed>(
  codec: C,
  name: string = `Option<${codec.name}>`
): OptionFromNullableC<C> => ...
```

**Example**

```ts
import * as t from 'io-ts'
import { createOptionFromNullable } from 'io-ts-types/lib/fp-ts/createOptionFromNullable'
import { right } from 'fp-ts/lib/Either'
import { none, some } from 'fp-ts/lib/Option'

const T = createOptionFromNullable(t.number)
assert.deepStrictEqual(T.decode(null), right(none))
assert.deepStrictEqual(T.decode(undefined), right(none))
assert.deepStrictEqual(T.decode(1), right(some(1)))
```
