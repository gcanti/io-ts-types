/**
 * @since 0.5.19
 */
import * as A from 'fp-ts/lib/Array'
import { chain } from 'fp-ts/lib/Either'
import { fromFoldable, toArray } from 'fp-ts/lib/Map'
import { Ord } from 'fp-ts/Ord'
import { getLastSemigroup } from 'fp-ts/lib/Semigroup'
import { pipe, Predicate } from 'fp-ts/function'
import * as t from 'io-ts'

interface Next<A> {
  readonly done?: boolean
  readonly value: A
}

const every = <K, V>(pk: Predicate<K>, pv: Predicate<V>) => (ma: Map<K, V>): boolean => {
  const entries = ma.entries()
  let e: Next<[K, V]>
  while (!(e = entries.next()).done) {
    if (pk(e.value[0]) === false || pv(e.value[1]) === false) {
      return false
    }
  }
  return true
}

/**
 * @since 0.5.19
 */
export interface MapFromEntriesC<K extends t.Mixed, V extends t.Mixed>
  extends t.Type<Map<t.TypeOf<K>, t.TypeOf<V>>, Array<[t.OutputOf<K>, t.OutputOf<V>]>, unknown> {}

/**
 * @since 0.5.19
 */
export function mapFromEntries<K extends t.Mixed, V extends t.Mixed>(
  keyCodec: K,
  KO: Ord<t.TypeOf<K>>,
  valueCodec: V,
  name: string = `Map<${keyCodec.name}, ${valueCodec.name}>`
): MapFromEntriesC<K, V> {
  const arr = t.array(t.tuple([keyCodec, valueCodec]))
  const toArrayO = toArray(KO)
  const fromArrayO = fromFoldable(KO, getLastSemigroup<t.TypeOf<V>>(), A.Foldable)
  const everyO = every(keyCodec.is, valueCodec.is)
  return new t.Type(
    name,
    (u): u is Map<t.TypeOf<K>, t.TypeOf<V>> => u instanceof Map && everyO(u),
    (u, c) =>
      pipe(
        arr.validate(u, c),
        chain(as => {
          const map = fromArrayO(as)
          return map.size !== as.length ? t.failure(u, c) : t.success(map)
        })
      ),
    a => arr.encode(toArrayO(a))
  )
}
