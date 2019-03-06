---
title: newtype-ts/fromNewtype.ts
nav_order: 22
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [fromNewtype (function)](#fromnewtype-function)
- [fromNewtypeCurried (function)](#fromnewtypecurried-function)

---

# fromNewtype (function)

Given

```ts
import { Newtype, iso } from 'newtype-ts'

type Age = Newtype<'Age', number>
```

I want to define a runtime type whose derived type is

```ts
type Person = {
  name: string
  age: Age
}
```

Solution

```ts
import * as t from 'io-ts'
import { fromNewtype } from 'io-ts-types/lib/newtype-ts/fromNewtype'

const Person = t.type({
  name: t.string,
  age: fromNewtype<Age>(t.Integer)
})
```

Usage example

```ts
import { iso } from 'newtype-ts'
import { Lens } from 'monocle-ts'
import { right } from 'fp-ts/lib/Either'

type Person = t.TypeOf<typeof Person>

const ageLens = Lens.fromProp<Person, 'age'>('age').composeIso(iso<Age>())

const sum = (a: number) => (b: number) => a + b

assert.deepStrictEqual(Person.decode({ name: 'Giulio', age: 44 }).map(ageLens.modify(sum(1)))), right({ name: 'Giulio', age: 44 }))
```

**Signature**

```ts
export const fromNewtype: <N extends AnyNewtype = never>(
  codec: Type<CarrierOf<N>, CarrierOf<N>, unknown>
) => Type<N, CarrierOf<N>, unknown> = type => ...
```

# fromNewtypeCurried (function)

**Signature**

```ts
export const fromNewtypeCurried: <N extends AnyNewtype = never>() => <O>(
  codec: Type<CarrierOf<N>, O, unknown>
) => Type<N, O, unknown> = () => type => ...
```
