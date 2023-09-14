---
title: JsonFromString.ts
nav_order: 17
parent: Modules
---

# JsonFromString overview

Added in v0.5.14

---

<h2 class="text-delta">Table of contents</h2>

- [JsonArray (interface)](#jsonarray-interface)
- [JsonRecord (interface)](#jsonrecord-interface)
- [Json (type alias)](#json-type-alias)
- [Json](#json)
- [JsonArray](#jsonarray)
- [JsonFromString](#jsonfromstring)
- [JsonRecord](#jsonrecord)

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

# Json

**Signature**

```ts
export const Json: t.Type<Json> = ...
```

Added in v0.5.15

# JsonArray

**Signature**

```ts
export const JsonArray: t.Type<JsonArray> = ...
```

Added in v0.5.15

# JsonFromString

**Signature**

```ts
export const JsonFromString: t.Type<Json, string, string> = ...
```

Added in v0.5.14

# JsonRecord

**Signature**

```ts
export const JsonRecord: t.Type<JsonRecord> = ...
```

Added in v0.5.15
