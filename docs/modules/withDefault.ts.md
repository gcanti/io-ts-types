---
title: withDefault.ts
nav_order: 22
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [withDefault (function)](#withdefault-function)

---

# withDefault (function)

Returns a default value if the input is `null`-ish.

**Signature**

```ts
export function withDefault<T extends t.Mixed>(
  type: T,
  defaultValue: t.TypeOf<T>,
  name = `${type.name} = ${JSON.stringify(defaultValue)}`
): t.Type<t.TypeOf<T>, t.TypeOf<T>, unknown> { ... }
```

**Example**

```ts
import { withDefault } from 'io-ts-types/lib/withDefault'
import * as t from 'io-ts'
import { right } from 'fp-ts/lib/Either'

const T = withDefault(t.number, -1)

assert.deepStrictEqual(T.decode(1), right(1))
assert.deepStrictEqual(T.decode(undefined), right(-1))
assert.deepStrictEqual(T.decode(null), right(-1))
```

Added in v0.6.0
