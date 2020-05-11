---
title: withMessage.ts
nav_order: 47
parent: Modules
---

# withMessage overview

Added in v0.4.3

---

<h2 class="text-delta">Table of contents</h2>

- [withMessage](#withmessage)

---

# withMessage

Returns a clone of the given codec that sets the given string as error messsage

**Signature**

```ts
export function withMessage<C extends t.Any>(codec: C, message: (i: t.InputOf<C>) => string): C { ... }
```

**Example**

```ts
import { withMessage } from 'io-ts-types/lib/withMessage'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'
import { right } from 'fp-ts/lib/Either'

const T = withMessage(t.number, () => 'Invalid number')

assert.deepStrictEqual(T.decode(1), right(1))
assert.deepStrictEqual(PathReporter.report(T.decode(null)), ['Invalid number'])
```

Added in v0.4.3
