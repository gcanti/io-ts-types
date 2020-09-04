---
title: clone.ts
nav_order: 3
parent: Modules
---

# clone overview

Added in v0.4.3

---

<h2 class="text-delta">Table of contents</h2>

- [clone](#clone)

---

# clone

Returns a clone of the given codec

**Signature**

```ts
export function clone<C extends t.Any>(t: C): C { ... }
```

**Example**

```ts
import { clone } from 'io-ts-types/lib/clone'
import * as t from 'io-ts'

assert.deepStrictEqual(clone(t.string), t.string)
```

Added in v0.4.3
