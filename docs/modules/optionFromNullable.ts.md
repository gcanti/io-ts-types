---
title: optionFromNullable.ts
nav_order: 24
parent: Modules
---

# optionFromNullable overview

Added in v0.5.0

---

<h2 class="text-delta">Table of contents</h2>

- [OptionFromNullableC (interface)](#optionfromnullablec-interface)
- [optionFromNullable](#optionfromnullable)

---

# OptionFromNullableC (interface)

**Signature**

```ts
export interface OptionFromNullableC<C extends t.Mixed>
  extends t.Type<O.Option<t.TypeOf<C>>, t.OutputOf<C> | null, unknown> {}
```

Added in v0.5.0

# optionFromNullable

**Signature**

```ts
export function optionFromNullable<C extends t.Mixed>(
  codec: C,
  name: string = `Option<${codec.name}>`
): OptionFromNullableC<C> { ... }
```

Added in v0.5.0
