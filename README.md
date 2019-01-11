A collection of runtime types and combinators for use with [io-ts](https://github.com/gcanti/io-ts)

# TypeScript compatibility

The stable version is tested against TypeScript 3.2.2, but should run with TypeScript 3.0.1+ too

**Note**. If you are running `< typescript@3.0.1` you have to polyfill `unknown`.

You can use [unknown-ts](https://github.com/gcanti/unknown-ts) as a polyfill.

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

### `date`

```ts
import { date } from 'io-ts-types/lib/Date/date'

const input = new Date(1973, 10, 30)
date.decode(input) // right(new Date(...))
```

### `DateFromISOString`

```ts
import { DateFromISOString } from 'io-ts-types/lib/Date/DateFromISOString'

const input = new Date(1973, 10, 30).toISOString()
DateFromISOString.decode(input) // right(new Date(...))
```

### `DateFromNumber`

```ts
import { DateFromNumber } from 'io-ts-types/lib/Date/DateFromNumber'

const input = new Date(1973, 10, 30).getTime()
DateFromNumber.decode(input) // right(new Date(...))
```

### `DateFromUnixTime`

```ts
import { DateFromUnixTime } from 'io-ts-types/lib/Date/DateFromUnixTime'

const input = new Date(1973, 10, 30).getTime() / 1000
DateFromUnixTime.decode(input) // right(new Date(...))
```

## `fp-ts`

### `createEitherFromJSON`

```ts
import * as t from 'io-ts'
import { createEitherFromJSON } from 'io-ts-types/lib/fp-ts/createEitherFromJSON'

const T = createEitherFromJSON(t.string, t.number)
T.decode({ type: 'Left', value: 's' }) // right(left('s'))
T.decode({ type: 'Right', value: 1 }) // right(right(1))
```

### `createNonEmptyArrayFromArray`

```ts
import * as t from 'io-ts'
import { createNonEmptyArrayFromArray } from 'io-ts-types/lib/fp-ts/createNonEmptyArrayFromArray'

const T = createNonEmptyArrayFromArray(t.number)
T.decode([1, 2, 3]) // right(new NonEmptyArray(1, [2, 3]))
```

### `createOptionFromJSON`

```ts
import * as t from 'io-ts'
import { createOptionFromJSON } from 'io-ts-types/lib/fp-ts/createOptionFromJSON'

const T = createOptionFromJSON(t.number)
T.decode({ type: 'Option', value: null }) // right(none)
T.decode({ type: 'Option', value: undefined }) // right(none)
T.decode({ type: 'Option', value: 1 }) // right(some(1))
```

### `createOptionFromNullable`

```ts
import * as t from 'io-ts'
import { createOptionFromNullable } from 'io-ts-types/lib/fp-ts/createOptionFromNullable'

const T = createOptionFromNullable(t.number)
T1.decode(null) // right(none)
T1.decode(undefined) // right(none)
T1.decode(1) // right(some(1))
```

### `createSetFromArray`

```ts
import * as t from 'io-ts'
import { ordNumber } from 'fp-ts/lib/Ord'
import { createSetFromArray } from 'io-ts-types/lib/fp-ts/createSetFromArray'

const T = createSetFromArray(t.number, ordNumber)
T.decode([1, 2, 3] // Set([1, 2, 3])
```

### `createStrMapFromDictionary`

```ts
import * as t from 'io-ts'
import { createStrMapFromDictionary } from 'io-ts-types/lib/fp-ts/createStrMapFromDictionary'

const T = createStrMapFromDictionary(t.number)
T.decode({ someNumber: 42 }) // StrMap<number>({ someNumber: 42 })
T.encode(new StrMap({ someNumber: 42 })) // { someNumber: 42 }
```

## `JSON`

### `JSONFromString`

```ts
import { JSONFromString } from 'io-ts-types/lib/fp-ts/JSONFromString'

JSONFromString.decode('{"name":"Giulio"}') // right({ name: 'Giulio' })
```

### `JSONTypeRT`

```ts
import { JSONTypeRT } from 'io-ts-types/lib/fp-ts/JSONTypeRT'

JSONTypeRT.decode({ name: 'Giulio' }) // right({ name: 'Giulio' })
```

## `monocle-ts`

### `lensesFromInterface`

```ts
import * as t from 'io-ts'
import { lensesFromInterface } from 'io-ts-types/lib/monocle-ts/lensesFromInterface'

const Person = t.type({
  name: t.string,
  age: t.number
})
/** return a Lens for each prop */
const lenses = lensesFromInterface(Person)
lenses.age.get({ name: 'Giulio', age: 44 }) // 44
```

### `lensesFromProps`

```ts
import * as t from 'io-ts'
import { lensesFromProps } from 'io-ts-types/lib/monocle-ts/lensesFromProps'

/** return a Lens for each prop */
const lenses = lensesFromProps({
  name: t.string,
  age: t.number
})
lenses.age.get({ name: 'Giulio', age: 44 }) // 44
```

### `TypePrismIso`

```ts
import * as t from 'io-ts'
import { get } from 'io-ts-types/lib/monocle-ts/TypePrismIso'
import { NumberFromString } from 'io-ts-types/lib/number/NumberFromString'

// given a runtime type, returns a Prism
const prism = get(NumberFromString)
prism.getOption('1') // some(1)
prism.getOption('a') // none

import { Prism } from 'monocle-ts'

// given a Prism, returns a runtime type
import { Prism } from 'monocle-ts'
import { none, some } from 'fp-ts/lib/Option'
import { reverseGet } from 'io-ts-types/lib/monocle-ts/TypePrismIso'

const numberFromStringPrism = new Prism<string, number>(s => {
  const n = parseFloat(s)
  return isNaN(n) ? none : some(n)
}, String)

const MyNumberFromString = reverseGet('MyNumberFromString', numberFromStringPrism, t.number.is)
```

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

```ts
import { IntegerFromString } from 'io-ts-types/lib/number/IntegerFromString'

IntegerFromString.decode('1') // right(1)
IntegerFromString.decode('1.1') // left(...)
```

### `NumberFromString`

```ts
import { NumberFromString } from 'io-ts-types/lib/number/NumberFromString'

NumberFromString.decode('1') // right(1)
NumberFromString.decode('1.1') // right(1.1)
```

## string

### `uuid`

```ts
import { uuid } from 'io-ts-types/lib/string/uuid'

uuid.decode('6e9c5587-a342-4b63-a901-87b31fa2ffa3') // right('6e9c5587-a342-4b63-a901-87b31fa2ffa3')
```
