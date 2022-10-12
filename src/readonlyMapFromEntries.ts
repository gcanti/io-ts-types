/**
 * @since 0.5.18
 */
import { Ord } from 'fp-ts/lib/Ord'
import * as t from 'io-ts'
import { mapFromEntries } from './mapFromEntries'

/**
 * @since 0.5.18
 */
export interface ReadonlyMapFromEntriesC<K extends t.Mixed, V extends t.Mixed>
  extends t.Type<ReadonlyMap<t.TypeOf<K>, t.TypeOf<V>>, ReadonlyArray<[t.OutputOf<K>, t.OutputOf<V>]>, unknown> {}

/**
 * @since 0.5.18
 */
export function readonlyMapFromEntries<K extends t.Mixed, V extends t.Mixed>(
  keyCodec: K,
  KO: Ord<t.TypeOf<K>>,
  valueCodec: V,
  name: string = `ReadonlyMap<${keyCodec.name}, ${valueCodec.name}>`
): ReadonlyMapFromEntriesC<K, V> {
  return mapFromEntries(keyCodec, KO, valueCodec, name) as any
}
