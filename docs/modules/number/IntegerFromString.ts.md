---
title: number/IntegerFromString.ts
nav_order: 23
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [IntegerFromStringC (interface)](#integerfromstringc-interface)
- [IntegerFromString (constant)](#integerfromstring-constant)

---

# IntegerFromStringC (interface)

**Signature**

```ts
export interface IntegerFromStringC extends t.RefinementType<NumberFromStringType, number, string, unknown> {}
```

# IntegerFromString (constant)

**Signature**

```ts
export const IntegerFromString: IntegerFromStringC = ...
```

**Example**

```ts
import { IntegerFromString } from 'io-ts-types/lib/number/IntegerFromString'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'

assert.deepStrictEqual(IntegerFromString.decode('1'), right(1))
assert.deepStrictEqual(PathReporter.report(IntegerFromString.decode('1.1')), [
  'Invalid value 1.1 supplied to : IntegerFromString'
])
```
