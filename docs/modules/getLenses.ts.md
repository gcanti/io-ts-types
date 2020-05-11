---
title: getLenses.ts
nav_order: 29
parent: Modules
---

# getLenses overview

Added in v0.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [ExactHasLenses (interface)](#exacthaslenses-interface)
- [HasLenses (type alias)](#haslenses-type-alias)
- [getLenses](#getlenses)

---

# ExactHasLenses (interface)

**Signature**

```ts
export interface ExactHasLenses extends t.ExactType<HasLenses> {}
```

Added in v0.5.0

# HasLenses (type alias)

**Signature**

```ts
export type HasLenses = t.InterfaceType<any> | ExactHasLenses
```

Added in v0.5.0

# getLenses

Return a `Lens` for each prop

**Signature**

```ts
export function getLenses<C extends HasLenses>(
  codec: C
): { [K in keyof t.TypeOf<C>]: Lens<t.TypeOf<C>, t.TypeOf<C>[K]> } { ... }
```

**Example**

```ts
import * as t from 'io-ts'
import { getLenses } from 'io-ts-types/lib/getLenses'

const Person = t.type({
  name: t.string,
  age: t.number
})

const lenses = getLenses(Person)
assert.strictEqual(lenses.age.get({ name: 'Giulio', age: 44 }), 44)
```

Added in v0.5.0
