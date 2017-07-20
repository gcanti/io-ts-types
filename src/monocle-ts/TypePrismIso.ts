import { Prism } from 'monocle-ts'
import { identity } from 'fp-ts/lib/function'
import * as t from 'io-ts'

export function get<A>(type: t.Type<A>): Prism<any, A> {
  return new Prism<any, A>(s => t.validate(s, type).toOption(), identity)
}

export function reverseGet<A>(prism: Prism<any, A>, name: string): t.Type<A> {
  return t.prism(t.any, prism.getOption, name)
}
