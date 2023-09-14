---
title: readonlyMapFromEntries.ts
nav_order: 25
parent: Modules
---

# readonlyMapFromEntries overview

Added in v0.5.19

---

<h2 class="text-delta">Table of contents</h2>

- [ReadonlyMapFromEntriesC (interface)](#readonlymapfromentriesc-interface)
- [readonlyMapFromEntries](#readonlymapfromentries)

---

# ReadonlyMapFromEntriesC (interface)

**Signature**

```ts
export interface ReadonlyMapFromEntriesC<K extends t.Mixed, V extends t.Mixed>
  extends t.Type<ReadonlyMap<t.TypeOf<K>, t.TypeOf<V>>, ReadonlyArray<[t.OutputOf<K>, t.OutputOf<V>]>, unknown> {}
```

Added in v0.5.19

# readonlyMapFromEntries

**Signature**

```ts
export function readonlyMapFromEntries<K extends t.Mixed, V extends t.Mixed>(
  keyCodec: K,
  KO: Ord<t.TypeOf<K>>,
  valueCodec: V,
  name: string = `ReadonlyMap<${keyCodec.name}, ${valueCodec.name}>`
): ReadonlyMapFromEntriesC<K, V> { ... }
```

Added in v0.5.19
