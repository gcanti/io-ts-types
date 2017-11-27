import { Prism } from 'monocle-ts'
import * as t from 'io-ts'

export function get<S, A>(type: t.Type<S, A>): Prism<S, A> {
  return new Prism<S, A>(s => t.validate(s, type).toOption(), type.serialize)
}

export function reverseGet<S, A>(name: string, prism: Prism<S, A>, is: t.Is<A>): t.Type<S, A> {
  return new t.Type(name, is, (s, c) => prism.getOption(s).fold(() => t.failure(s, c), t.success), prism.reverseGet)
}
