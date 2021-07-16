---
title: URLFromString.ts
nav_order: 27
parent: Modules
---

# URLFromString overview

Added in v0.5.17

---

<h2 class="text-delta">Table of contents</h2>

- [URLFromStringC (interface)](#urlfromstringc-interface)
- [URLFromString](#urlfromstring)

---

# URLFromStringC (interface)

**Signature**

```ts
export interface URLFromStringC extends t.Type<typeof URL, string, unknown> {}
```

Added in v0.5.17

# URLFromString

**Signature**

```ts
export const URLFromString: URLFromStringC = ...
```

**Example**

```ts
import { URLFromString } from 'io-ts-types/lib/URLFromString'
import { right } from 'fp-ts/lib/Either'
import { PathReporter } from 'io-ts/lib/PathReporter'

assert.deepStrictEqual(
  URLFromString.decode('https://gcanti.github.io/io-ts-types/'),
  right(new URL('https://gcanti.github.io/io-ts-types/'))
)
assert.deepStrictEqual(PathReporter.report(URLFromString.decode('/djulio')), [
  'Invalid value "/djulio" supplied to : URLFromString'
])
```

Added in v0.5.17
