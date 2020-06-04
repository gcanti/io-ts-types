/**
 * @since 0.5.7
 */
import { Ord } from 'fp-ts/lib/Ord'
import * as t from 'io-ts'
import { setFromArray } from './setFromArray'

/**
 * @since 0.5.7
 */
export interface ReadonlySetFromArrayC<C extends t.Mixed>
  extends t.Type<ReadonlySet<t.TypeOf<C>>, ReadonlyArray<t.OutputOf<C>>, unknown> {}

/**
 * @since 0.5.7
 */
export function readonlySetFromArray<C extends t.Mixed>(
  codec: C,
  O: Ord<t.TypeOf<C>>,
  name: string = `ReadonlySet<${codec.name}>`
): ReadonlySetFromArrayC<C> {
  return setFromArray(codec, O, name) as any
}
