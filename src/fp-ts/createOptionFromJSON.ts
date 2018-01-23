import * as t from 'io-ts'

import { None, Option, Some, fromNullable } from 'fp-ts/lib/Option'

export type JSONOption<A> = {
  type: 'Option'
  value: A | null | undefined
}

export function createOptionFromJSON<A>(type: t.Type<t.mixed, A>): t.Type<t.mixed, Option<A>> {
  const JSONOption = t.interface({
    type: t.literal('Option'),
    value: t.union([type, t.null, t.undefined])
  })
  return new t.Type(
    `Option<${type.name}>`,
    (v): v is Option<A> => v instanceof Some || v instanceof None,
    (s, c) => JSONOption.validate(s, c).chain(o => t.success(fromNullable(o.value))),
    a => {
      const res = a.toNullable()
      return { type: 'Option', value: res !== null ? type.serialize(res) : null }
    }
  )
}
