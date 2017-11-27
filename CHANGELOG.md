# Changelog

> **Tags:**
>
> * [New Feature]
> * [Bug Fix]
> * [Breaking Change]
> * [Documentation]
> * [Internal]
> * [Polish]
> * [Experimental]

**Note**: Gaps between patch versions are faulty/broken releases. **Note**: A feature tagged as Experimental is in a
high state of flux, you're at risk of it changing without notice.

# 0.2.0

* **New Feature**
  * add `JSON/JSONTypeRT` (@gcanti)
  * add `monocle-ts/lensesFromProps` (@gcanti)
* **Breaking Change**
  * upgrade to `io-ts` 0.9 (@gcanti)
  * change signature of `monocle-ts/TypePrismIso` (@gcanti)
  * remove `monocle-ts/composeTypeWithPrism` (@gcanti)
  * remove `monocle-ts/prismsFromUnion` (@gcanti)
  * remove `monocle-ts/lensesFromTuple` (@gcanti)
  * remove `fp-ts/createOption` (@gcanti)
  * remove `fp-ts/createEither` (@gcanti)

# 0.1.1

* **Breaking Change**
  * upgrade to fp-ts 0.6, io-ts 0.8, monocle.ts 0.5 (@gcanti)
  * change name from `JSON` to `JSONType` and add export, fix #8 (@gcanti)

# 0.0.2

* **New Feature**
  * add `lensesFromInterface` (@leemhenson)
  * add `lensesFromTuple` (@gcanti)
  * add `prismsFromUnion` (@gcanti)

# 0.0.1

Initial release
