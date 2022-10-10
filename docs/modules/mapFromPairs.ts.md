---
title: mapFromPairs.ts
nav_order: 17
parent: Modules
---

# mapFromPairs overview

Added in v0.5.18

---

<h2 class="text-delta">Table of contents</h2>

- [MapFromPairsC (interface)](#mapfrompairsc-interface)
- [mapFromPairs](#mapfrompairs)

---

# MapFromPairsC (interface)

**Signature**

```ts
export interface MapFromPairsC<K extends t.Mixed, V extends t.Mixed>
  extends t.Type<Map<t.TypeOf<K>, t.TypeOf<V>>, Array<[t.OutputOf<K>, t.OutputOf<V>]>, unknown> {}
```

Added in v0.5.18

# mapFromPairs

**Signature**

```ts
export function mapFromPairs<K extends t.Mixed, V extends t.Mixed>(
  keyCodec: K,
  KO: Ord<t.TypeOf<K>>,
  valueCodec: V,
  name: string = `Map<${keyCodec.name}, ${valueCodec.name}>`
): MapFromPairsC<K, V> { ... }
```

Added in v0.5.18
