# Changelog

> **Tags:**
>
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]

**Note**: Gaps between patch versions are faulty/broken releases. **Note**: A feature tagged as Experimental is in a
high state of flux, you're at risk of it changing without notice.

# 0.4.2

- **Polish**
  - export all interfaces, fix #77 (@sledorze)

# 0.4.1

- **Polish**
  - apply `io-ts@1.6.x` interface pattern (@gcanti)

# 0.4.0

- **Bug fix**
  - switch to `io-ts` pattern, fix #67 (PR #71) (@gcanti)

**Note**. This fix should **not** be a breaking change for most users. However since some signatures are changed, namely their type parameters, this release is published with a minor bump as a precaution.

# 0.3.14

- **New Feature**
  - add `Date/date` (@mlegenhausen)

# 0.3.13

- **New Feature**
  - Export Codec class Types alongside their combinator, https://github.com/gcanti/io-ts-types/pull/63 (@sledorze)

# 0.3.12

- **Internal**
  - fix broken build with `typescript@3.1-rc`, closes #61 (@sledorze)

# 0.3.11

- **New Feature**
  - add `boolean/BooleanFromString`, fixes #55 (@sledorze)

# 0.3.10

- **New Feature**
  - add `fallback`, fixes #49 (@sledorze)
  - add `fromNullable`, closes #51 (@sledorze)

# 0.3.9

- **New Feature**
  - add `string/UUID` (@mlegenhausen)

# 0.3.8

- **New Feature**
  - add `newtype-ts/fromRefinement` (@gcanti)
  - add `newtype-ts/fromNewtypeCurried`, closes #44 (@gcanti)

# 0.3.6

- **Bug Fix**
  - fix `NumberFromString` validation, closes #40 (@sledorze)
- **Internal**
  - simplify `lensesFromInterface` typings, closes #37 (@gcanti)

# 0.3.4

- **New Feature**
  - add `createStrMapFromDictionary` (@mlegenhausen)

# 0.3.3

- **New Feature**
  - add tagged custom types for (@gcanti, @sledorze)
    - createOptionFromNullable
    - createOptionFromJSON
    - createNonEmptyArrayFromArray
    - createEitherFromJSON
    - DateFromISOString
    - DateFromNumber
    - DateFromUnixTime
    - NumberFromString
    - JSONFromString
  - add createSetFromArray, closes #24 (@sledorze)

# 0.3.2

- **New Feature**
  - add `mapOutput`, closes #21 (@gcanti)

# 0.3.1

- **New Feature**
  - add `createNonEmptyArrayFromArray` (@sledorze)
- **Bug Fix**
  - createOptionFromNullable: handle output type (@gcanti)

# 0.3.0

- **Breaking Change**
  - upgrade to `fp-ts@1.0.0`, `io-ts@1.0.0`, `monocle-ts@1.0.0`, `newtype-ts@0.2.0` (@gcanti)

# 0.2.4

- **Bug Fix**
  - createEitherFromJSON and createOptionFromJSON now do serialize correctly their underlying type, fix #15 (@sledorze)

# 0.2.3

- **New Feature**
  - add `MixedStringPrism` (@gcanti)
  - upgrade to latest `io-ts` (0.9.5) (@gcanti)

# 0.2.2

- **New Feature**
  - add `Date/DateFromUnixTime` (@gcanti)
  - add `monocle-ts/MillisecondSecondIso` (@gcanti)
- **Internal**
  - upgrade to latest `io-ts@0.9.1` (@gcanti)

# 0.2.1

- **New Feature**
  - add `newtype-ts/fromNewtype`, fix #11 (@sledorze)

# 0.2.0

- **New Feature**
  - add `JSON/JSONTypeRT` (@gcanti)
  - add `monocle-ts/lensesFromProps` (@gcanti)
- **Breaking Change**
  - upgrade to `io-ts` 0.9 (@gcanti)
  - change signature of `monocle-ts/TypePrismIso` (@gcanti)
  - remove `monocle-ts/composeTypeWithPrism` (@gcanti)
  - remove `monocle-ts/prismsFromUnion` (@gcanti)
  - remove `monocle-ts/lensesFromTuple` (@gcanti)
  - remove `fp-ts/createOption` (@gcanti)
  - remove `fp-ts/createEither` (@gcanti)

# 0.1.1

- **Breaking Change**
  - upgrade to fp-ts 0.6, io-ts 0.8, monocle.ts 0.5 (@gcanti)
  - change name from `JSON` to `JSONType` and add export, fix #8 (@gcanti)

# 0.0.2

- **New Feature**
  - add `lensesFromInterface` (@leemhenson)
  - add `lensesFromTuple` (@gcanti)
  - add `prismsFromUnion` (@gcanti)

# 0.0.1

Initial release
