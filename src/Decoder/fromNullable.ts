/**
 * @since 0.6.0
 */
import * as D from 'io-ts/lib/Decoder'

/**
 * Returns a decoder that replaces a nullable input with the given value `a`
 *
 * @since 0.6.0
 */
export function fromNullable<A>(decoder: D.Decoder<A>, a: A): D.Decoder<A> {
  return {
    decode: u => (u == null ? D.success(a) : decoder.decode(u))
  }
}
