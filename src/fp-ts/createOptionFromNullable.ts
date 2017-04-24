import * as t from 'io-ts'
import { Option } from 'fp-ts/lib/Option'
import { createOption } from './createOption'

export function createOptionFromNullable<A>(type: t.Type<A>): t.Type<Option<A>> {
  return createOption(t.union([type, t.null]), `Option<${type.name}>`)
}
