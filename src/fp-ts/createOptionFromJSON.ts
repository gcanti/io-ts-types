import * as t from 'io-ts'
import { Option } from 'fp-ts/lib/Option'
import { createOption } from './createOption'

export type JSONOption<A> = {
  type: 'Option',
  value: A | null
}

export function createOptionFromJSON<A>(type: t.Type<A>): t.Type<Option<A>> {
  const JSONOption = t.interface({
    type: t.literal('Option'),
    value: t.union([type, t.null])
  })
  return createOption(JSONOption.map(json => json.value), `Option<${type.name}>`)
}
