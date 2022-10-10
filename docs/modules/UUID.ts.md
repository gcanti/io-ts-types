---
title: UUID.ts
nav_order: 29
parent: Modules
---

# UUID overview

Added in v0.4.6

---

<h2 class="text-delta">Table of contents</h2>

- [UUIDBrand (interface)](#uuidbrand-interface)
- [UUID (type alias)](#uuid-type-alias)
- [UUID](#uuid)

---

# UUIDBrand (interface)

**Signature**

```ts
export interface UUIDBrand {
  readonly UUID: unique symbol
}
```

Added in v0.4.6

# UUID (type alias)

**Signature**

```ts
export type UUID = t.Branded<string, UUIDBrand>
```

Added in v0.4.6

# UUID

**Signature**

```ts
export const UUID: t.BrandC<t.StringC, UUIDBrand> = ...
```

**Example**

```ts
import { UUID } from 'io-ts-types/lib/UUID'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'

assert.deepStrictEqual(
  UUID.decode('00000000-0000-0000-0000-000000000000'),
  right('00000000-0000-0000-0000-000000000000')
)
assert.deepStrictEqual(PathReporter.report(UUID.decode('not a uuid')), [
  'Invalid value "not a uuid" supplied to : UUID'
])
```

Added in v0.4.6
