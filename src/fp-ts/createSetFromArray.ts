import * as t from 'io-ts'
import * as sets from 'fp-ts/lib/Set'
import * as arrays from 'fp-ts/lib/Array'
import { Ord } from 'fp-ts/lib/Ord'

const getSetFromArray = <A = never>(ordA: Ord<A>) => {
  const insertSetOrdA = sets.insert(ordA)
  return new t.Type<Set<A>, Array<A>, Array<A>>(
    `SetFromArray`,
    (m): m is Set<A> => m instanceof Set,
    (as, c) => {
      const newSet = arrays.array.reduce(as, new Set<A>(), (set, a) => insertSetOrdA(a, set))
      return newSet.size !== as.length ? t.failure(as, c) : t.success(newSet)
    },
    sets.toArray(ordA)
  )
}

export const createSetFromArray = <A, O>(
  type: t.Type<A, O, t.mixed>,
  ordA: Ord<A>
): t.Type<Set<A>, Array<O>, t.mixed> => t.array(type).pipe(getSetFromArray(ordA), `Set<${type.name}>`)
