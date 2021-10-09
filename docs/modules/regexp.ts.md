---
title: regexp.ts
nav_order: 26
parent: Modules
---

# regexp overview

Added in v0.4.4

---

<h2 class="text-delta">Table of contents</h2>

- [RegExpC (interface)](#regexpc-interface)
- [regexp](#regexp)

---

# RegExpC (interface)

**Signature**

```ts
export interface RegExpC extends t.Type<RegExp, RegExp, unknown> {}
```

Added in v0.4.4

# regexp

**Signature**

```ts
export const regexp: RegExpC = ...
```

**Example**

```ts
import { regexp } from 'io-ts-types/lib/regexp'
import { right } from 'fp-ts/lib/Either'

const input1 = /\w+/
const input2 = new RegExp('\\w+')
assert.deepStrictEqual(regexp.decode(input1), right(input1))
assert.deepStrictEqual(regexp.decode(input2), right(input2))
```

Added in v0.4.4
