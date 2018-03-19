A collection of runtime types and combinators for use with [io-ts](https://github.com/gcanti/io-ts)

# API

## `mapOutput`

Changes the output type of the given runtime type

```ts
import { mapOutput } from 'io-ts-types/lib/mapOutput'
import { createOptionFromNullable } from 'io-ts-types/lib/fp-ts/createOptionFromNullable'

// Input: t.Type<Option<number>, number | null, t.mixed>
const Input = createOptionFromNullable(t.number)

const toUndefined = <A>(x: A | null): A | undefined => (x === null ? undefined : x)

// Output: t.Type<Option<number>, number | undefined, t.mixed>
const Output = mapOutput(Input, toUndefined)

assert.strictEqual(T.encode(none), undefined)
assert.strictEqual(T.encode(some(1)), 1)
```

## `Date`

### `DateFromISOString`

TODO

### `DateFromNumber`

TODO

### `DateFromUnixTime`

TODO

## `fp-ts`

### `createEitherFromJSON`

TODO

### `createNonEmptyArrayFromArray`

TODO

### `createOptionFromJSON`

TODO

### `createOptionFromNullable`

TODO

### `createSetFromArray`

```ts
import * as t from 'io-ts'
import { ordNumber } from 'fp-ts/lib/Ord'

const NumberSet = createSetFromArray(t.number, ordNumber)
NumberSet.decode([1, 2, 3] // Set([1, 2, 3])
```

### `createStrMapFromDictionary`

```ts
import * as t from 'io-ts';

const NumberStrMap = createStrMapFromDictionary(t.number)
NumberStrMap.decode({ someNumber: 42 }) // StrMap<number>({ someNumber: 42 })
NumberStrMap.encode(new StrMap({ someNumber: 42 })) // { someNumber: 42 }

```

## `JSON`

### `JSONFromString`

TODO

### `JSONTypeRT`

TODO

## `monocle-ts`

### `lensesFromInterface`

TODO

### `lensesFromProps`

TODO

### `TypePrismIso`

TODO

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

## number

### `IntegerFromString`

TODO

### `NumberFromString`

TODO
