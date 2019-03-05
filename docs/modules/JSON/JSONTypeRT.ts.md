---
title: JSON/JSONTypeRT.ts
nav_order: 17
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [JSONArray (interface)](#jsonarray-interface)
- [JSONTypeC (interface)](#jsontypec-interface)
- [JSONObject (type alias)](#jsonobject-type-alias)
- [JSONType (type alias)](#jsontype-type-alias)
- [JSONTypeRT (constant)](#jsontypert-constant)

---

# JSONArray (interface)

**Signature**

```ts
export interface JSONArray extends Array<JSONType> {}
```

# JSONTypeC (interface)

**Signature**

```ts
export interface JSONTypeC extends t.RecursiveType<t.Type<JSONType>> {}
```

# JSONObject (type alias)

**Signature**

```ts
export type JSONObject = { [key: string]: JSONType }
```

# JSONType (type alias)

**Signature**

```ts
export type JSONType = null | string | number | boolean | JSONArray | JSONObject
```

# JSONTypeRT (constant)

**Signature**

```ts
export const JSONTypeRT: JSONTypeC = ...
```

**Example**

```ts
import { JSONTypeRT } from 'io-ts-types/lib/JSON/JSONTypeRT'
import { right } from 'fp-ts/lib/Either'

assert.deepStrictEqual(JSONTypeRT.decode({ name: 'Giulio' }), right({ name: 'Giulio' }))
```
