---
title: BufferFromBase64String.ts
nav_order: 3
parent: Modules
---

# BufferFromBase64String overview

Added in v0.5.12

---

<h2 class="text-delta">Table of contents</h2>

- [BufferFromBase64StringC (interface)](#bufferfrombase64stringc-interface)
- [BufferFromBase64String](#bufferfrombase64string)

---

# BufferFromBase64StringC (interface)

**Signature**

```ts
export interface BufferFromBase64StringC extends t.Type<Buffer, string, unknown> {}
```

Added in v0.5.12

# BufferFromBase64String

**Signature**

```ts
export const BufferFromBase64String: BufferFromBase64StringC = ...
```

**Example**

```ts
import { BufferFromBase64String } from 'io-ts-types/lib/BufferFromBase64String'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'

assert.deepStrictEqual(BufferFromBase64String.decode(''), right(Buffer.alloc(0)))
assert.deepStrictEqual(BufferFromBase64String.decode('aGVsbG8='), right(Buffer.from('aGVsbG8=', 'base64')))
assert.deepStrictEqual(PathReporter.report(BufferFromBase64String.decode('aGV     sbG8=')), [
  'Invalid value "aGV     sbG8=" supplied to : BufferFromBase64String'
])
assert.deepStrictEqual(PathReporter.report(BufferFromBase64String.decode('!@#$%^')), [
  'Invalid value "!@#$%^" supplied to : BufferFromBase64String'
])
```

Added in v0.5.12
