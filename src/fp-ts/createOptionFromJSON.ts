import * as t from 'io-ts'

import { Option, None, Some, fromNullable } from 'fp-ts/lib/Option'

export interface JSONOption<A> {
  type: 'Option'
  value: A | null | undefined
}

export function createOptionFromJSON<A, O>(type: t.Type<A, O>): t.Type<Option<A>, JSONOption<O>> {
  const JSONOption = t.type({
    type: t.literal('Option'),
    value: t.union([type, t.null, t.undefined])
  })
  return new t.Type(
    `Option<${type.name}>`,
    (m): m is Option<A> => m instanceof None || (m instanceof Some && type.is(m.value)),
    (m, c) => JSONOption.validate(m, c).chain(o => t.success(fromNullable(o.value))),
    a =>
      a.foldL<JSONOption<O>>(
        () => ({ type: 'Option', value: null }),
        value => ({ type: 'Option', value: type.encode(value) })
      )
  )
}
