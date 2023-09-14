---
title: BufferFromBase64.ts
nav_order: 4
parent: Modules
---

# BufferFromBase64 overview

Added in v0.5.19

---

<h2 class="text-delta">Table of contents</h2>

- [BufferFromBase64C (interface)](#bufferfrombase64c-interface)
- [BufferFromBase64](#bufferfrombase64)

---

# BufferFromBase64C (interface)

**Signature**

```ts
export interface BufferFromBase64C extends t.Type<Buffer, string, unknown> {}
```

Added in v0.5.19

# BufferFromBase64

**Signature**

```ts
export const BufferFromBase64: BufferFromBase64C = ...
```

**Example**

```ts
import { BufferFromBase64 } from 'io-ts-types/lib/BufferFromBase64'
import { right } from 'fp-ts/lib/Either'

const base64String = 'dGVzdCBvZiB0aGUgY29kZWM='
assert.deepStrictEqual(BufferFromBase64.decode(base64String), right(Buffer.from('test of the codec')))
```

Added in v0.5.19
