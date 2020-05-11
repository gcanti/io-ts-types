/**
 * @since 0.6.0
 */
import * as D from 'io-ts/lib/Decoder'

/**
 * Returns a decoder that always succeed using the given value `a` if the original decoder fails
 *
 * @since 0.6.0
 */
export function withFallback<A>(decoder: D.Decoder<A>, a: A): D.Decoder<A> {
  return D.decoder.alt(decoder, () => D.decoder.of(a))
}
