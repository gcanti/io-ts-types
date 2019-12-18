---
title: alt.ts
nav_order: 1
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [alt (function)](#alt-function)

---

# alt (function)

Alternative codec for the same output, the encoder will be the first parameter that provided to `alt`
this function is good when you know that you want some type but the input can be in multiple form

**Signature**

```ts
export function alt<A, IA, IB, O, OB>(
  a: Type<A, O, IA>,
  b: Type<A, OB, IB>,
  name: string = `alt(${a.name}, ${b.name})`
): Type<A, O, IA | IB> { ... }
```

**Example**

```ts
import { NumberFromString } from 'io-ts-types/lib/NumberFromString'
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { date } from 'io-ts-types/lib/date'
import { right } from 'fp-ts/lib/Either'
import { alt } from 'io-ts-types/lib/alt'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'

const T = alt(t.number, NumberFromString)

assert.deepStrictEqual(T.decode('1'), right(1))
assert.deepStrictEqual(T.decode(1), right(1))
assert.deepStrictEqual(PathReporter.report(T.decode('a')), [
  'Invalid value "a" supplied to : alt(number, NumberFromString)'
])

// encoder will always be the first one
const D = alt(DateFromISOString, date)

// type A = t.TypeOf<typeof D> // Date
// type O = t.OutputOf<typeof D> // string

const d = new Date(Date.UTC(1988, 10, 10, 0, 0, 0))
assert.strictEqual(D.encode(d), '1988-11-10T00:00:00.000Z')
```
