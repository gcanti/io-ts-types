import * as t from 'io-ts'
import { NonEmptyArray, fromArray } from 'fp-ts/lib/NonEmptyArray'

const getNonEmptyArrayFromArray = <A = never>() =>
  new t.Type<NonEmptyArray<A>, Array<A>, Array<A>>(
    'NonEmptyArrayFromArray',
    (m): m is NonEmptyArray<A> => m instanceof NonEmptyArray,
    (as, c) => fromArray(as).foldL(() => t.failure(as, c), t.success),
    nep => nep.toArray()
  )

export const createNonEmptyArrayFromArray = <A, O = A>(
  type: t.Type<A, O, t.mixed>
): t.Type<NonEmptyArray<A>, O[], t.mixed> =>
  t.array(type).pipe(getNonEmptyArrayFromArray(), `NonEmptyArray<${type.name}>`)
