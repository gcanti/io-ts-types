/**
 * @since 0.6.0
 */
import { Eq } from 'fp-ts/lib/Eq'
import { fromArray } from 'fp-ts/lib/Set'
import * as D from 'io-ts/lib/Decoder'

/**
 * @since 0.6.0
 */
export function setFromArray<A>(E: Eq<A>): (item: D.Decoder<A>) => D.Decoder<Set<A>> {
  const fromArrayE = fromArray(E)
  return item => D.decoder.map(D.array(item), fromArrayE)
}
