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
- [`newtype-ts`](https://github.com/gcanti/newtype-ts)

starting from `0.5.0` you must install `fp-ts`, `io-ts`, `monocle-ts`,
and `newtype-ts` manually (`fp-ts`, `io-ts`, `monocle-ts`, and `newtype-ts` are listed in `peerDependency`)

# TypeScript compatibility

The stable version is tested against TypeScript 3.2.2, but should run with TypeScript 3.0.1+ too

**Note**. If you are running `< typescript@3.0.1` you have to polyfill `unknown`.

You can use [unknown-ts](https://github.com/gcanti/unknown-ts) as a polyfill.

# Documentation

- [API Reference](https://gcanti.github.io/io-ts-types)
