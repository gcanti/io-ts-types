---
title: getEq.ts
nav_order: 10
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [HasEq (type alias)](#haseq-type-alias)
- [getEq (function)](#geteq-function)

---

# HasEq (type alias)

**Signature**

```ts
export type HasEq =
  | t.StringType
  | t.NumberType
  | t.BooleanType
  | ArrayCodec
  | RecordCodec
  | StructCodec<any>
  | ExactCodec
```

Added in v0.5.2

# getEq (function)

Return an `Eq` instance for the provided io-ts codec.

**Signature**

```ts
export function getEq<T extends HasEq>(codec: T): Eq<t.TypeOf<T>> { ... }
```

**Example**

```ts
import * as t from 'io-ts'
import { getEq } from 'io-ts-types/lib/getEq'

const Person = t.type({
  name: t.string,
  age: t.number,
  tags: t.array(t.string)
})

const eqPerson = getEq(Person)
assert.strictEqual(
  eqPerson.equals({ name: 'John', age: 30, tags: ['a'] }, { name: 'John', age: 30, tags: ['a'] }),
  true
)
```

Added in v0.5.2
