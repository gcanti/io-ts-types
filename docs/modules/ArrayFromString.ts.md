---
title: ArrayFromString.ts
nav_order: 1
parent: Modules
---

# ArrayFromString overview

Added in v0.5.17

---

<h2 class="text-delta">Table of contents</h2>

- [ArrayFromStringC (interface)](#arrayfromstringc-interface)
- [ArrayFromString](#arrayfromstring)

---

# ArrayFromStringC (interface)

**Signature**

```ts
export interface ArrayFromStringC<C extends t.Mixed> extends t.Type<Array<t.TypeOf<C>>, string, unknown> {}
```

Added in v0.5.17

# ArrayFromString

**Signature**

```ts
export function ArrayFromString<C extends t.Mixed>(
  codec: C,
  decoderSeparator: string | RegExp = '',
  encoderSeparator = '',
  name = `ArrayFromString<${codec.name}>`
): ArrayFromStringC<C> { ... }
```

**Example**

```ts
import { ArrayFromString } from 'io-ts-types/lib/ArrayFromString'
import { NumberFromString } from 'io-ts-types/lib/NumberFromString'
import { right } from 'fp-ts/lib/Either'

assert.deepStrictEqual(ArrayFromString(NumberFromString, ',').decode('1,2,3'), right([1, 2, 3]))
assert.deepStrictEqual(ArrayFromString(NumberFromString, /[\s,]+/).decode('1, 2, 3'), right([1, 2, 3]))
```

Added in v0.5.17
