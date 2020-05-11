/**
 * @since 0.6.0
 */
import { isNonEmpty } from 'fp-ts/lib/Array'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import * as D from 'io-ts/lib/Decoder'

/**
 * @since 0.6.0
 */
export function nonEmptyArray<A>(item: D.Decoder<A>): D.Decoder<NonEmptyArray<A>> {
  return D.refinement(D.array(item), isNonEmpty, 'NonEmptyArray')
}
