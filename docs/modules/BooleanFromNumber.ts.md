---
title: BooleanFromNumber.ts
nav_order: 3
parent: Modules
---

# BooleanFromNumber overview

Added in v0.5.13

---

<h2 class="text-delta">Table of contents</h2>

- [BooleanFromNumberC (interface)](#booleanfromnumberc-interface)
- [BooleanFromNumber](#booleanfromnumber)

---

# BooleanFromNumberC (interface)

**Signature**

```ts
export interface BooleanFromNumberC extends t.Type<boolean, number, unknown> {}
```

Added in v0.5.13

# BooleanFromNumber

**Signature**

```ts
export const BooleanFromNumber: BooleanFromNumberC = ...
```

**Example**

```ts
import { BooleanFromNumber } from 'io-ts-types/lib/BooleanFromNumber'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'

assert.deepStrictEqual(BooleanFromNumber.decode(1), right(true))
assert.deepStrictEqual(BooleanFromNumber.decode(0), right(false))
assert.deepStrictEqual(BooleanFromNumber.decode(123), right(true))
assert.deepStrictEqual(PathReporter.report(BooleanFromNumber.decode('a')), [
  'Invalid value "a" supplied to : BooleanFromNumber'
])
```

Added in v0.5.13
