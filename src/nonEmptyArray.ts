/**
 * @since 0.5.0
 */
import * as t from 'io-ts'
import { NonEmptyArray, fromArray } from 'fp-ts/lib/NonEmptyArray'
import { isNonEmpty } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import { chain } from 'fp-ts/lib/Either'
import { isNone } from 'fp-ts/lib/Option'
import { identity } from 'fp-ts/lib/function'

/**
 * @since 0.5.0
 */
export interface NonEmptyArrayC<C extends t.Mixed>
  extends t.Type<NonEmptyArray<t.TypeOf<C>>, NonEmptyArray<t.OutputOf<C>>, unknown> {}

/**
 * @since 0.5.0
 */
export function nonEmptyArray<C extends t.Mixed>(
  codec: C,
  name: string = `NonEmptyArray<${codec.name}>`
): NonEmptyArrayC<C> {
  const arr = t.array(codec)
  return new t.Type(
    name,
    (u): u is NonEmptyArray<t.TypeOf<C>> => arr.is(u) && isNonEmpty(u),
    (u, c) =>
      pipe(
        arr.validate(u, c),
        chain(as => {
          const onea = fromArray(as)
          return isNone(onea) ? t.failure(u, c) : t.success(onea.value)
        })
      ),
    identity
  )
}
