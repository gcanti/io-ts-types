import * as t from 'io-ts'
import { Option, Some, None, fromNullable } from 'fp-ts/lib/Option'

export const createOptionFromNullable = <A, O>(type: t.Type<A, O>): t.Type<Option<A>, O | null> => {
  const Nullable = t.union([type, t.null, t.undefined])
  return new t.Type(
    `Option<${type.name}>`,
    (m): m is Option<A> => m instanceof None || (m instanceof Some && type.is(m.value)),
    (s, c) => Nullable.validate(s, c).chain(u => t.success(fromNullable(u))),
    a => a.map(type.encode).toNullable()
  )
}
