---
title: fp-ts/createOptionFromJSON.ts
nav_order: 10
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [JSONOption (interface)](#jsonoption-interface)
- [OptionFromJSONC (interface)](#optionfromjsonc-interface)
- [OptionFromJSONType (class)](#optionfromjsontype-class)
- [createOptionFromJSON (function)](#createoptionfromjson-function)

---

# JSONOption (interface)

**Signature**

```ts
export interface JSONOption<A> {
  type: 'Option'
  value: A | null | undefined
}
```

# OptionFromJSONC (interface)

**Signature**

```ts
export interface OptionFromJSONC<C extends t.Mixed>
  extends OptionFromJSONType<C, Option<t.TypeOf<C>>, JSONOption<t.OutputOf<C>>, unknown> {}
```

# OptionFromJSONType (class)

**Signature**

```ts
export class OptionFromJSONType<C, A, O, I> {
  constructor(
    name: string,
    is: OptionFromJSONType<C, A, O, I>['is'],
    validate: OptionFromJSONType<C, A, O, I>['validate'],
    serialize: OptionFromJSONType<C, A, O, I>['encode'],
    readonly type: C
  ) { ... }
  ...
}
```

# createOptionFromJSON (function)

**Signature**

```ts
export const createOptionFromJSON = <C extends t.Mixed>(
  codec: C,
  name: string = `Option<${codec.name}>`
): OptionFromJSONC<C> => ...
```

**Example**

```ts
import * as t from 'io-ts'
import { createOptionFromJSON } from 'io-ts-types/lib/fp-ts/createOptionFromJSON'
import { right } from 'fp-ts/lib/Either'
import { none, some } from 'fp-ts/lib/Option'

const T = createOptionFromJSON(t.number)
assert.deepStrictEqual(T.decode({ type: 'Option', value: null }), right(none))
assert.deepStrictEqual(T.decode({ type: 'Option', value: undefined }), right(none))
assert.deepStrictEqual(T.decode({ type: 'Option', value: 1 }), right(some(1)))
```
