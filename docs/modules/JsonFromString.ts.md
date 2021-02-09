---
title: JsonFromString.ts
nav_order: 16
parent: Modules
---

# JsonFromString overview

Added in v0.5.14

---

<h2 class="text-delta">Table of contents</h2>

- [JsonArray (interface)](#jsonarray-interface)
- [JsonRecord (interface)](#jsonrecord-interface)
- [Json (type alias)](#json-type-alias)
- [JsonFromString](#jsonfromstring)

---

# JsonArray (interface)

**Signature**

```ts
export interface JsonArray extends ReadonlyArray<Json> {}
```

Added in v0.5.14

# JsonRecord (interface)

**Signature**

```ts
export interface JsonRecord {
  readonly [key: string]: Json
}
```

Added in v0.5.14

# Json (type alias)

Copied from `fp-ts/Either` module.

**Signature**

```ts
export type Json = boolean | number | string | null | JsonArray | JsonRecord
```

Added in v0.5.14

# JsonFromString

**Signature**

```ts
export const JsonFromString: t.Type<Json, string, string> = ...
```

Added in v0.5.14
