---
title: Date/DateFromUnixTime.ts
nav_order: 5
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [DateFromUnixTimeC (interface)](#datefromunixtimec-interface)
- [DateFromUnixTimeType (class)](#datefromunixtimetype-class)
- [DateFromUnixTime (constant)](#datefromunixtime-constant)

---

# DateFromUnixTimeC (interface)

**Signature**

```ts
export interface DateFromUnixTimeC extends DateFromUnixTimeType {}
```

# DateFromUnixTimeType (class)

**Signature**

```ts
export class DateFromUnixTimeType {
  constructor() { ... }
  ...
}
```

# DateFromUnixTime (constant)

**Signature**

```ts
export const DateFromUnixTime: DateFromUnixTimeC = ...
```

**Example**

```ts
import { DateFromUnixTime } from 'io-ts-types/lib/Date/DateFromUnixTime'
import { right } from 'fp-ts/lib/Either'

const date = new Date(1973, 10, 30)
const input = date.getTime() / 1000
assert.deepStrictEqual(DateFromUnixTime.decode(input), right(date))
```
