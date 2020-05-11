/**
 * @since 0.6.0
 */
import * as O from 'fp-ts/lib/Option'
import * as D from 'io-ts/lib/Decoder'

const sum = D.sum('_tag')
const noneLiteral = D.literal('None')
const someLiteral = D.literal('Some')

/**
 * Given a decoder representing a type `A`, returns a decoder representing `Option<A>` that is able to decode
 * the JSON representation of an `Option`.
 *
 * @since 0.6.0
 */
export function option<A>(value: D.Decoder<A>): D.Decoder<O.Option<A>> {
  return sum({
    None: D.type({
      _tag: noneLiteral
    }),
    Some: D.type({
      _tag: someLiteral,
      value
    })
  })
}
