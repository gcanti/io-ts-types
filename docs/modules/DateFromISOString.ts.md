---
title: DateFromISOString.ts
nav_order: 5
parent: Modules
---

# DateFromISOString overview

Added in v0.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [DateFromISOStringC (interface)](#datefromisostringc-interface)
- [DateFromISOString](#datefromisostring)

---

# DateFromISOStringC (interface)

**Signature**

```ts
export interface DateFromISOStringC extends t.Type<Date, string, unknown> {}
```

Added in v0.5.0

# DateFromISOString

**Signature**

```ts
export const DateFromISOString: DateFromISOStringC = ...
```

**Example**

```ts
import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
import { right } from 'fp-ts/lib/Either'

const date = new Date(1973, 10, 30)
const input = date.toISOString()
assert.deepStrictEqual(DateFromISOString.decode(input), right(date))
```

Added in v0.5.0
