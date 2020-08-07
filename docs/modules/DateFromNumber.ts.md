---
title: DateFromNumber.ts
nav_order: 5
parent: Modules
---

# DateFromNumber overview

Added in v0.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [DateFromNumberC (interface)](#datefromnumberc-interface)
- [DateFromNumber](#datefromnumber)

---

# DateFromNumberC (interface)

**Signature**

```ts
export interface DateFromNumberC extends t.Type<Date, number, unknown> {}
```

Added in v0.5.0

# DateFromNumber

**Signature**

```ts
export const DateFromNumber: DateFromNumberC = ...
```

**Example**

```ts
import { DateFromNumber } from 'io-ts-types/lib/DateFromNumber'
import { right } from 'fp-ts/Either'

const date = new Date(1973, 10, 30)
const input = date.getTime()
assert.deepStrictEqual(DateFromNumber.decode(input), right(date))
```

Added in v0.5.0
