---
title: monocle-ts/lensesFromInterface.ts
nav_order: 18
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [lensesFromInterface (function)](#lensesfrominterface-function)

---

# lensesFromInterface (function)

Return a `Lens` for each prop

**Signature**

```ts
export const lensesFromInterface = <C extends t.InterfaceType<any> | t.StrictType<any>>(
  codec: C
): { [K in keyof C['props']]: Lens<t.TypeOf<C>, t.TypeOfProps<C['props']>[K]> } => ...
```

**Example**

```ts
import * as t from 'io-ts'
import { lensesFromInterface } from 'io-ts-types/lib/monocle-ts/lensesFromInterface'

const Person = t.type({
  name: t.string,
  age: t.number
})

const lenses = lensesFromInterface(Person)
assert.strictEqual(lenses.age.get({ name: 'Giulio', age: 44 }), 44)
```
