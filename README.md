A collection of runtime types and combinators for use with [io-ts](https://github.com/gcanti/io-ts)

# API

## `newtype-ts`

### `fromNewtype`

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

type Person = t.TypeOf<typeof Person>

const ageLens = Lens.fromProp<Person, 'age'>('age').composeIso(iso<Age>())

const sum = (a: number) => (b: number) => a + b

console.log(Person.decode({ name: 'Giulio', age: 44 }).map(ageLens.modify(sum(1))))
// => right({ name: 'Giulio', age: 44 })
```
