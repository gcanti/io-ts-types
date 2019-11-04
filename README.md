A collection of runtime types and combinators for use with [io-ts](https://github.com/gcanti/io-ts)

# Installation

To install the stable version:

```sh
npm i io-ts-types
```

**Note**. `io-ts-types` depends on

- [`fp-ts`](https://github.com/gcanti/fp-ts)
- [`io-ts`](https://github.com/gcanti/io-ts)
- [`monocle-ts`](https://github.com/gcanti/monocle-ts)

starting from `0.5.0` you must install `fp-ts`, `io-ts` and `monocle-ts` manually (`fp-ts`, `io-ts` and `monocle-ts` are listed in `peerDependency`)

# Usage

Import specific codecs and combinators directly from the `lib` folder, as in:

```ts
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString"
```

In this way, you'll only need to add the `monocle-ts` dependency if you import any of the combinators depending on it, like `getLenses`

# TypeScript compatibility

The stable version is tested against TypeScript 3.2.2, but should run with TypeScript 3.0.1+ too

**Note**. If you are running `< typescript@3.0.1` you have to polyfill `unknown`.

You can use [unknown-ts](https://github.com/gcanti/unknown-ts) as a polyfill.

# Documentation

- [API Reference](https://gcanti.github.io/io-ts-types)
