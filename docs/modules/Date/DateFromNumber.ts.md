---
title: Date/DateFromNumber.ts
nav_order: 4
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [DateFromNumberC (interface)](#datefromnumberc-interface)
- [DateFromNumberType (class)](#datefromnumbertype-class)
- [DateFromNumber (constant)](#datefromnumber-constant)

---

# DateFromNumberC (interface)

**Signature**

```ts
export interface DateFromNumberC extends DateFromNumberType {}
```

# DateFromNumberType (class)

**Signature**

```ts
export class DateFromNumberType {
  constructor() { ... }
  ...
}
```

# DateFromNumber (constant)

**Signature**

```ts
export const DateFromNumber: DateFromNumberC = ...
```

**Example**

```ts
import { DateFromNumber } from 'io-ts-types/lib/Date/DateFromNumber'
import { right } from 'fp-ts/lib/Either'

const date = new Date(1973, 10, 30)
const input = date.getTime()
assert.deepStrictEqual(DateFromNumber.decode(input), right(date))
```
