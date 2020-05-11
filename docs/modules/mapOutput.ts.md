---
title: mapOutput.ts
nav_order: 37
parent: Modules
---

# mapOutput overview

Added in v0.3.2

---

<h2 class="text-delta">Table of contents</h2>

- [mapOutput](#mapoutput)

---

# mapOutput

Changes the output type of the given runtime type

**Signature**

```ts
export function mapOutput<A, O, I, P>(
  codec: t.Type<A, O, I>,
  f: (p: O) => P,
  name: string = codec.name
): t.Type<A, P, I> { ... }
```

**Example**

```ts
import * as t from 'io-ts'
import { mapOutput } from 'io-ts-types/lib/mapOutput'
import { optionFromNullable } from 'io-ts-types/lib/optionFromNullable'
import { none, some } from 'fp-ts/lib/Option'

// Input: t.Type<Option<number>, number | null, t.mixed>
const Input = optionFromNullable(t.number)

const toUndefined = <A>(x: A | null): A | undefined => (x === null ? undefined : x)

// Output: t.Type<Option<number>, number | undefined, t.mixed>
const Output = mapOutput(Input, toUndefined)

assert.strictEqual(Output.encode(none), undefined)
assert.strictEqual(Output.encode(some(1)), 1)
```

Added in v0.3.2
