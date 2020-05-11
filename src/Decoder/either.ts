/**
 * @since 0.6.0
 */
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

const sum = D.sum('_tag')
const leftLiteral = D.literal('Left')
const rightLiteral = D.literal('Right')

/**
 * Given a decoder representing a type `E` and a decoder representing a type `A`, returns a decoder representing `Either<L, A>`
 * that is able to decode the JSON representation of an `Either`.
 *
 * @since 0.6.0
 */
export function either<E, A>(left: D.Decoder<E>, right: D.Decoder<A>): D.Decoder<E.Either<E, A>> {
  return sum({
    Left: D.type({
      _tag: leftLiteral,
      left: left
    }),
    Right: D.type({
      _tag: rightLiteral,
      right: right
    })
  })
}
