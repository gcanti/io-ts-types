---
title: string/uuid.ts
nav_order: 28
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [uuidC (interface)](#uuidc-interface)
- [uuid (constant)](#uuid-constant)

---

# uuidC (interface)

**Signature**

```ts
export interface uuidC extends t.RefinementType<t.StringType, string, string, unknown> {}
```

# uuid (constant)

**Signature**

```ts
export const uuid: uuidC = ...
```

**Example**

```ts
import { uuid } from 'io-ts-types/lib/string/uuid'

uuid.decode('6e9c5587-a342-4b63-a901-87b31fa2ffa3') // right('6e9c5587-a342-4b63-a901-87b31fa2ffa3')
```
