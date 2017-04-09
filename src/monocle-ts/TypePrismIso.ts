import { Prism } from 'monocle-ts'
import { isNone } from 'fp-ts/lib/Option'
import * as t from 'io-ts'

export function get<A>(type: t.Type<A>): Prism<any, A> {
  return new Prism<any, A>(
    s => t.validate(s, type).toOption(),
    a => a
  )
}

export function reverseGet<A>(prism: Prism<any, A>, name: string): t.Type<A> {
  return new t.Type<A>(
    name,
    (v, c) => {
      const a = prism.getOption(v)
      return isNone(a) ? t.failure<A>(v, c) : t.success(a.value)
    }
  )
}
