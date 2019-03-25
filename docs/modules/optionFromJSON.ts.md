---
title: optionFromJSON.ts
nav_order: 27
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [OptionFromJSONC (interface)](#optionfromjsonc-interface)
- [JSONOption (type alias)](#jsonoption-type-alias)
- [optionFromJSON (function)](#optionfromjson-function)

---

# OptionFromJSONC (interface)

**Signature**

```ts
export interface OptionFromJSONC<C extends t.Mixed>
  extends t.Type<Option<t.TypeOf<C>>, JSONOption<t.OutputOf<C>>, unknown> {}
```

# JSONOption (type alias)

**Signature**

```ts
export type JSONOption<A> = { _tag: 'None' } | { _tag: 'Some'; value: A }
```

# optionFromJSON (function)

Given a codec representing a type `A`, returns a codec representing `Option<A>` that is able to deserialize
the JSON representation of an `Option`.

**Signature**

```ts
export function optionFromJSON<C extends t.Mixed>(
  codec: C,
  name: string = `Option<${codec.name}>`
): OptionFromJSONC<C> { ... }
```

**Example**

```ts
import { optionFromJSON } from 'io-ts-types/lib/optionFromJSON'
import { right } from 'fp-ts/lib/Either'
import { Option, none, some } from 'fp-ts/lib/Option'
import * as t from 'io-ts'
import { PathReporter } from 'io-ts/lib/PathReporter'

const toJSON = <A>(ma: Option<A>): unknown => JSON.parse(JSON.stringify(ma))

const T = optionFromJSON(t.number)

assert.deepStrictEqual(T.decode(toJSON(none)), right(none))
assert.deepStrictEqual(T.decode(toJSON(some(1))), right(some(1)))
assert.deepStrictEqual(PathReporter.report(T.decode(some('a'))), [
  'Invalid value "a" supplied to : Option<number>/value: number'
])
```

Added in v0.4.4
