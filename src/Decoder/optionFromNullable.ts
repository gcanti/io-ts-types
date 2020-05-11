/**
 * @since 0.6.0
 */
import * as O from 'fp-ts/lib/Option'
import * as D from 'io-ts/lib/Decoder'

/**
 * @since 0.6.0
 */
export function optionFromNullable<A>(value: D.Decoder<A>): D.Decoder<O.Option<A>> {
  return D.decoder.map(D.nullable(value), O.fromNullable)
}
