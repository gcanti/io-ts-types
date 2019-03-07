---
title: IntFromString.ts
nav_order: 15
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [IntFromStringC (interface)](#intfromstringc-interface)
- [IntFromString (constant)](#intfromstring-constant)

---

# IntFromStringC (interface)

**Signature**

```ts
export interface IntFromStringC extends t.Type<t.Int, string, unknown> {}
```

# IntFromString (constant)

A codec that succeeds if a string can be parsed to an integer

**Signature**

```ts
export const IntFromString: IntFromStringC = ...
```

**Example**

```ts
import { IntFromString } from 'io-ts-types/lib/IntFromString'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'

assert.deepStrictEqual(IntFromString.decode('1'), right(1))
assert.deepStrictEqual(PathReporter.report(IntFromString.decode('1.1')), [
  'Invalid value "1.1" supplied to : IntFromString'
])
```

Added in v0.4.4
