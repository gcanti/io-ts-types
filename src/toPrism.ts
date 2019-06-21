import { Prism } from 'monocle-ts'
import * as t from 'io-ts'
import { fromEither } from 'fp-ts/lib/Option'

/**
 * @since 0.5.0
 */
export function toPrism<A, O extends I, I>(codec: t.Type<A, O, I>): Prism<O, A> {
  return new Prism<O, A>(s => fromEither(codec.decode(s)), codec.encode)
}
