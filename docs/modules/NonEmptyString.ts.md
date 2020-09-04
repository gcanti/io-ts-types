---
title: NonEmptyString.ts
nav_order: 17
parent: Modules
---

# NonEmptyString overview

Added in v0.4.5

---

<h2 class="text-delta">Table of contents</h2>

- [NonEmptyStringBrand (interface)](#nonemptystringbrand-interface)
- [NonEmptyStringC (interface)](#nonemptystringc-interface)
- [NonEmptyString (type alias)](#nonemptystring-type-alias)
- [NonEmptyString](#nonemptystring)

---

# NonEmptyStringBrand (interface)

**Signature**

```ts
export interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol
}
```

Added in v0.4.5

# NonEmptyStringC (interface)

**Signature**

```ts
export interface NonEmptyStringC extends t.Type<NonEmptyString, string, unknown> {}
```

Added in v0.4.5

# NonEmptyString (type alias)

**Signature**

```ts
export type NonEmptyString = t.Branded<string, NonEmptyStringBrand>
```

Added in v0.4.5

# NonEmptyString

A codec that succeeds if a string is not empty

**Signature**

```ts
export const NonEmptyString: NonEmptyStringC = ...
```

**Example**

```ts
import { NonEmptyString } from 'io-ts-types/lib/NonEmptyString'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'

assert.deepStrictEqual(NonEmptyString.decode('a'), right('a'))
assert.deepStrictEqual(PathReporter.report(NonEmptyString.decode('')), [
  'Invalid value "" supplied to : NonEmptyString'
])
```

Added in v0.4.5
