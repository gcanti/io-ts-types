---
title: Date/date.ts
nav_order: 3
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [DateC (interface)](#datec-interface)
- [DateType (class)](#datetype-class)
- [date (constant)](#date-constant)

---

# DateC (interface)

**Signature**

```ts
export interface DateC extends DateType {}
```

# DateType (class)

**Signature**

```ts
export class DateType {
  constructor() { ... }
  ...
}
```

# date (constant)

**Signature**

```ts
export const date: DateC = ...
```

**Example**

```ts
import { date } from 'io-ts-types/lib/Date/date'
import { right } from 'fp-ts/lib/Either'

const input = new Date(1973, 10, 30)
assert.deepStrictEqual(date.decode(input), right(input))
```
