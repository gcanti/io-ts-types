/**
 * @since 0.5.18
 */
import { Ord } from 'fp-ts/lib/Ord'
import * as t from 'io-ts'
import { mapFromPairs } from './mapFromPairs'

/**
 * @since 0.5.18
 */
export interface ReadonlyMapFromPairsC<K extends t.Mixed, V extends t.Mixed>
  extends t.Type<ReadonlyMap<t.TypeOf<K>, t.TypeOf<V>>, ReadonlyArray<[t.OutputOf<K>, t.OutputOf<V>]>, unknown> {}

/**
 * @since 0.5.18
 */
export function readonlyMapFromPairs<K extends t.Mixed, V extends t.Mixed>(
  keyCodec: K,
  KO: Ord<t.TypeOf<K>>,
  valueCodec: V,
  name: string = `ReadonlyMap<${keyCodec.name}, ${valueCodec.name}>`
): ReadonlyMapFromPairsC<K, V> {
  return mapFromPairs(keyCodec, KO, valueCodec, name) as any
}
