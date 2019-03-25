---
title: UUID.ts
nav_order: 29
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [UUIDBrand (interface)](#uuidbrand-interface)
- [UUIDC (interface)](#uuidc-interface)
- [UUID (type alias)](#uuid-type-alias)
- [UUID (constant)](#uuid-constant)

---

# UUIDBrand (interface)

**Signature**

```ts
export interface UUIDBrand {
  readonly UUID: unique symbol
}
```

# UUIDC (interface)

**Signature**

```ts
export interface UUIDC extends t.Type<UUID, string, unknown> {}
```

# UUID (type alias)

**Signature**

```ts
export type UUID = t.Branded<string, UUIDBrand>
```

# UUID (constant)

**Signature**

```ts
export const UUID = ...
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
