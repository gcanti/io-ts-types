---
title: BigIntFromString.ts
nav_order: 1
parent: Modules
---

# BigIntFromString overview

Added in v0.5.11

---

<h2 class="text-delta">Table of contents</h2>

- [BigIntFromStringC (interface)](#bigintfromstringc-interface)
- [BigIntFromString](#bigintfromstring)

---

# BigIntFromStringC (interface)

**Signature**

```ts
export interface BigIntFromStringC extends t.Type<bigint, string, unknown> {}
```

Added in v0.5.11

# BigIntFromString

**Signature**

```ts
export const BigIntFromString: BigIntFromStringC = ...
```

**Example**

```ts
import { BigIntFromString } from 'io-ts-types/lib/BigIntFromString'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'

assert.deepStrictEqual(BigIntFromString.decode('1'), right(BigInt(1)))
assert.deepStrictEqual(PathReporter.report(BigIntFromString.decode('1.1')), [
  'Invalid value "1.1" supplied to : BigIntFromString'
])
assert.deepStrictEqual(PathReporter.report(BigIntFromString.decode('')), [
  'Invalid value "" supplied to : BigIntFromString'
])
assert.deepStrictEqual(PathReporter.report(BigIntFromString.decode(' ')), [
  'Invalid value " " supplied to : BigIntFromString'
])
```

Added in v0.5.11
