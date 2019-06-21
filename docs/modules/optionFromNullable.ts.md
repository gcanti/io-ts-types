---
title: optionFromNullable.ts
nav_order: 17
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [OptionFromNullableC (interface)](#optionfromnullablec-interface)
- [optionFromNullable (function)](#optionfromnullable-function)

---

# OptionFromNullableC (interface)

**Signature**

```ts
export interface OptionFromNullableC<C extends t.Mixed>
  extends t.Type<Option<t.TypeOf<C>>, t.OutputOf<C> | null, unknown> {}
```

Added in v0.5.0

# optionFromNullable (function)

**Signature**

```ts
export function optionFromNullable<C extends t.Mixed>(
  codec: C,
  name: string = `Option<${codec.name}>`
): OptionFromNullableC<C> { ... }
```

Added in v0.5.0
