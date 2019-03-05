---
title: JSON/JSONFromString.ts
nav_order: 16
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [JSONFromStringC (interface)](#jsonfromstringc-interface)
- [JSONType (type alias)](#jsontype-type-alias)
- [JSONFromStringType (class)](#jsonfromstringtype-class)
- [JSONFromString (constant)](#jsonfromstring-constant)

---

# JSONFromStringC (interface)

**Signature**

```ts
export interface JSONFromStringC extends JSONFromStringType {}
```

# JSONType (type alias)

**Signature**

```ts
export type JSONType = JSONType
```

# JSONFromStringType (class)

**Signature**

```ts
export class JSONFromStringType {
  constructor() { ... }
  ...
}
```

# JSONFromString (constant)

**Signature**

```ts
export const JSONFromString: JSONFromStringC = ...
```

**Example**

```ts
import { JSONFromString } from 'io-ts-types/lib/JSON/JSONFromString'
import { right } from 'fp-ts/lib/Either'

assert.deepStrictEqual(JSONFromString.decode('{"name":"Giulio"}'), right({ name: 'Giulio' }))
```
