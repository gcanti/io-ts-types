import * as t from 'io-ts'
import { Option, none, some } from 'fp-ts/lib/Option'

export function createOption<A>(type: t.Type<null | A>, name: string): t.Type<Option<A>> {
  return t.mapWithName(
    v => v === null ? none : some(v),
    type,
    name
  )
}
