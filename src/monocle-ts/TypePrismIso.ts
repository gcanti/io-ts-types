import { Prism } from 'monocle-ts'
import * as t from 'io-ts'
import { fromEither } from 'fp-ts/lib/Option'

export function get<A, O extends I, I>(type: t.Type<A, O, I>): Prism<O, A> {
  return new Prism<O, A>(s => fromEither(type.decode(s)), type.encode)
}

export function reverseGet<S, A>(name: string, prism: Prism<S, A>, is: t.Is<A>): t.Type<A, S, S> {
  return new t.Type(name, is, (s, c) => prism.getOption(s).foldL(() => t.failure(s, c), t.success), prism.reverseGet)
}
