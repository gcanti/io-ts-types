---
title: BooleanFromString.ts
nav_order: 3
parent: Modules
---

# BooleanFromString overview

Added in v0.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [BooleanFromStringC (interface)](#booleanfromstringc-interface)
- [BooleanFromString](#booleanfromstring)

---

# BooleanFromStringC (interface)

**Signature**

```ts
export interface BooleanFromStringC extends t.Type<boolean, string, unknown> {}
```

Added in v0.5.0

# BooleanFromString

**Signature**

```ts
export const BooleanFromString: BooleanFromStringC = ...
```

**Example**

```ts
import { BooleanFromString } from 'io-ts-types/lib/BooleanFromString'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'

assert.deepStrictEqual(BooleanFromString.decode('true'), right(true))
assert.deepStrictEqual(BooleanFromString.decode('false'), right(false))
assert.deepStrictEqual(PathReporter.report(BooleanFromString.decode('a')), [
  'Invalid value "a" supplied to : BooleanFromString'
])
```

Added in v0.5.0
