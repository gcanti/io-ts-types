---
title: DateFromUnixTime.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [DateFromUnixTimeC (interface)](#datefromunixtimec-interface)
- [DateFromUnixTime (constant)](#datefromunixtime-constant)

---

# DateFromUnixTimeC (interface)

**Signature**

```ts
export interface DateFromUnixTimeC extends t.Type<Date, number, unknown> {}
```

Added in v0.5.0

# DateFromUnixTime (constant)

**Signature**

```ts
export const DateFromUnixTime: DateFromUnixTimeC = ...
```

**Example**

```ts
import { DateFromUnixTime } from 'io-ts-types/lib/DateFromUnixTime'
import { right } from 'fp-ts/lib/Either'

const date = new Date(1973, 10, 30)
const input = date.getTime() / 1000
assert.deepStrictEqual(DateFromUnixTime.decode(input), right(date))
```

Added in v0.5.0
