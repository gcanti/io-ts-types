import * as t from 'io-ts'
import { Option, Some, None, fromNullable } from 'fp-ts/lib/Option'

export const createOptionFromNullable = <A>(type: t.Type<any, A>): t.Type<any, Option<A>> => {
  const Nullable = t.union([type, t.null, t.undefined])
  return new t.Type(
    `Option<${type.name}>`,
    (v): v is Option<A> => v instanceof Some || v instanceof None,
    (s, c) => Nullable.validate(s, c).chain(u => t.success(fromNullable(u))),
    a => a.toNullable()
  )
}
