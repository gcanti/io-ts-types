---
title: monocle-ts/lensesFromProps.ts
nav_order: 19
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [LensesFromProps (type alias)](#lensesfromprops-type-alias)
- [lensesFromProps (function)](#lensesfromprops-function)

---

# LensesFromProps (type alias)

**Signature**

```ts
export type LensesFromProps<P extends t.Props> = { [K in keyof P]: Lens<t.TypeOfProps<P>, t.TypeOfProps<P>[K]> }
```

# lensesFromProps (function)

Return a `Lens` for each prop

**Signature**

```ts
export const lensesFromProps = <P extends t.Props>(
  props: P
): { [K in keyof P]: Lens<t.TypeOfProps<P>, t.TypeOfProps<P>[K]> } => ...
```

**Example**

```ts
import * as t from 'io-ts'
import { lensesFromProps } from 'io-ts-types/lib/monocle-ts/lensesFromProps'

const lenses = lensesFromProps({
  name: t.string,
  age: t.number
})

assert.strictEqual(lenses.age.get({ name: 'Giulio', age: 44 }), 44)
```
