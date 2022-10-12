---
title: mapFromEntries.ts
nav_order: 17
parent: Modules
---

# mapFromEntries overview

Added in v0.5.19

---

<h2 class="text-delta">Table of contents</h2>

- [MapFromEntriesC (interface)](#mapfromentriesc-interface)
- [mapFromEntries](#mapfromentries)

---

# MapFromEntriesC (interface)

**Signature**

```ts
export interface MapFromEntriesC<K extends t.Mixed, V extends t.Mixed>
  extends t.Type<Map<t.TypeOf<K>, t.TypeOf<V>>, Array<[t.OutputOf<K>, t.OutputOf<V>]>, unknown> {}
```

Added in v0.5.19

# mapFromEntries

**Signature**

```ts
export function mapFromEntries<K extends t.Mixed, V extends t.Mixed>(
  keyCodec: K,
  KO: Ord<t.TypeOf<K>>,
  valueCodec: V,
  name: string = `Map<${keyCodec.name}, ${valueCodec.name}>`
): MapFromEntriesC<K, V> { ... }
```

Added in v0.5.19
