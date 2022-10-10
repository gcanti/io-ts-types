---
title: readonlyMapFromPairs.ts
nav_order: 24
parent: Modules
---

# readonlyMapFromPairs overview

Added in v0.5.18

---

<h2 class="text-delta">Table of contents</h2>

- [ReadonlyMapFromPairsC (interface)](#readonlymapfrompairsc-interface)
- [readonlyMapFromPairs](#readonlymapfrompairs)

---

# ReadonlyMapFromPairsC (interface)

**Signature**

```ts
export interface ReadonlyMapFromPairsC<K extends t.Mixed, V extends t.Mixed>
  extends t.Type<ReadonlyMap<t.TypeOf<K>, t.TypeOf<V>>, ReadonlyArray<[t.OutputOf<K>, t.OutputOf<V>]>, unknown> {}
```

Added in v0.5.18

# readonlyMapFromPairs

**Signature**

```ts
export function readonlyMapFromPairs<K extends t.Mixed, V extends t.Mixed>(
  keyCodec: K,
  KO: Ord<t.TypeOf<K>>,
  valueCodec: V,
  name: string = `ReadonlyMap<${keyCodec.name}, ${valueCodec.name}>`
): ReadonlyMapFromPairsC<K, V> { ... }
```

Added in v0.5.18
