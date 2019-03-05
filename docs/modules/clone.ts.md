---
title: clone.ts
nav_order: 2
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [clone (function)](#clone-function)

---

# clone (function)

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
