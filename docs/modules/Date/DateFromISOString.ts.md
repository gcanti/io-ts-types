---
title: Date/DateFromISOString.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [DateFromISOStringC (interface)](#datefromisostringc-interface)
- [DateFromISOStringType (class)](#datefromisostringtype-class)
- [DateFromISOString (constant)](#datefromisostring-constant)

---

# DateFromISOStringC (interface)

**Signature**

```ts
export interface DateFromISOStringC extends DateFromISOStringType {}
```

# DateFromISOStringType (class)

**Signature**

```ts
export class DateFromISOStringType {
  constructor() { ... }
  ...
}
```

# DateFromISOString (constant)

**Signature**

```ts
export const DateFromISOString: DateFromISOStringC = ...
```

**Example**

```ts
import { DateFromISOString } from 'io-ts-types/lib/Date/DateFromISOString'
import { right } from 'fp-ts/lib/Either'

const date = new Date(1973, 10, 30)
const input = date.toISOString()
assert.deepStrictEqual(DateFromISOString.decode(input), right(date))
```
