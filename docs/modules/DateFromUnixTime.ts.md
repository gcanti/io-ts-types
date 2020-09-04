---
title: DateFromUnixTime.ts
nav_order: 7
parent: Modules
---

# DateFromUnixTime overview

Added in v0.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [DateFromUnixTimeC (interface)](#datefromunixtimec-interface)
- [DateFromUnixTime](#datefromunixtime)

---

# DateFromUnixTimeC (interface)

**Signature**

```ts
export interface DateFromUnixTimeC extends t.Type<Date, number, unknown> {}
```

Added in v0.5.0

# DateFromUnixTime

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
