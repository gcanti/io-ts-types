---
title: monocle-ts/TypePrismIso.ts
nav_order: 21
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [get (function)](#get-function)
- [reverseGet (function)](#reverseget-function)

---

# get (function)

**Signature**

```ts
export function get<A, O extends I, I>(codec: t.Type<A, O, I>): Prism<O, A> { ... }
```

**Example**

```ts
import { get } from 'io-ts-types/lib/monocle-ts/TypePrismIso'
import { NumberFromString } from 'io-ts-types/lib/number/NumberFromString'
import { none, some } from 'fp-ts/lib/Option'

const prism = get(NumberFromString)
assert.deepStrictEqual(prism.getOption('1'), some(1))
assert.deepStrictEqual(prism.getOption('a'), none)
```

# reverseGet (function)

**Signature**

```ts
export function reverseGet<S, A>(name: string, prism: Prism<S, A>, is: t.Is<A>): t.Type<A, S, S> { ... }
```

**Example**

```ts
import * as t from 'io-ts'
import { Prism } from 'monocle-ts'
import { none, some } from 'fp-ts/lib/Option'
import { reverseGet } from 'io-ts-types/lib/monocle-ts/TypePrismIso'
import { right } from 'fp-ts/lib/Either'

const numberFromStringPrism = new Prism<string, number>(s => {
  const n = parseFloat(s)
  return isNaN(n) ? none : some(n)
}, String)

const MyNumberFromString = reverseGet('MyNumberFromString', numberFromStringPrism, t.number.is)

assert.deepStrictEqual(MyNumberFromString.decode('1'), right(1))
```
