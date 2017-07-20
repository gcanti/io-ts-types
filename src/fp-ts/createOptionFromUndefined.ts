import * as t from 'io-ts'
import { Option, none, some } from 'fp-ts/lib/Option'

export function createOptionFromUndefined<A>(type: t.Type<A>): t.Type<Option<A>> {
  return t.mapWithName(v => (v === undefined ? none : some(v)), t.union([type, t.undefined]), `Option<${type.name}>`)
}
