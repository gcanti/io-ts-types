---
title: number/NumberFromString.ts
nav_order: 26
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [NumberFromStringC (interface)](#numberfromstringc-interface)
- [NumberFromStringType (class)](#numberfromstringtype-class)
- [NumberFromString (constant)](#numberfromstring-constant)

---

# NumberFromStringC (interface)

**Signature**

```ts
export interface NumberFromStringC extends NumberFromStringType {}
```

# NumberFromStringType (class)

**Signature**

```ts
export class NumberFromStringType {
  constructor() { ... }
  ...
}
```

# NumberFromString (constant)

**Signature**

```ts
export const NumberFromString: NumberFromStringC = ...
```

**Example**

```ts
import { NumberFromString } from 'io-ts-types/lib/number/NumberFromString'

NumberFromString.decode('1') // right(1)
NumberFromString.decode('1.1') // right(1.1)
```
