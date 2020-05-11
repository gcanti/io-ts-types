---
title: NumberFromString.ts
nav_order: 40
parent: Modules
---

# NumberFromString overview

Added in v0.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [NumberFromStringC (interface)](#numberfromstringc-interface)
- [NumberFromString](#numberfromstring)

---

# NumberFromStringC (interface)

**Signature**

```ts
export interface NumberFromStringC extends t.Type<number, string, unknown> {}
```

Added in v0.5.0

# NumberFromString

**Signature**

```ts
export const NumberFromString: NumberFromStringC = ...
```

**Example**

```ts
import { NumberFromString } from 'io-ts-types/lib/NumberFromString'

NumberFromString.decode('1') // right(1)
NumberFromString.decode('1.1') // right(1.1)
```

Added in v0.5.0
