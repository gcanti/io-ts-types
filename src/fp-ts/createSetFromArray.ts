import * as t from 'io-ts'
import * as sets from 'fp-ts/lib/Set'
import * as arrays from 'fp-ts/lib/Array'
import { Ord } from 'fp-ts/lib/Ord'

export class SetFromArrayType<RT extends t.Any, A = any, O = A, I = t.mixed> extends t.Type<A, O, I> {
  readonly _tag: 'SetFromArrayType' = 'SetFromArrayType'
  constructor(
    name: string,
    is: SetFromArrayType<RT, A, O, I>['is'],
    validate: SetFromArrayType<RT, A, O, I>['validate'],
    serialize: SetFromArrayType<RT, A, O, I>['encode'],
    readonly type: RT
  ) {
    super(name, is, validate, serialize)
  }
}

export const createSetFromArray = <RT extends t.Type<A, O>, A = any, O = any>(
  type: RT,
  ordA: Ord<t.TypeOf<RT>>,
  name: string = `Set<${type.name}>`
): t.Type<Set<t.TypeOf<RT>>, Array<t.OutputOf<RT>>, t.InputOf<RT>> => {
  const insertSetOrdA = sets.insert(ordA)
  return t.array(type).pipe(
    new SetFromArrayType<RT, Set<t.TypeOf<RT>>, Array<t.TypeOf<RT>>, Array<t.TypeOf<RT>>>(
      `SetFromArray`,
      (m): m is Set<t.TypeOf<RT>> => m instanceof Set,
      (as, c) => {
        const newSet = arrays.array.reduce(as, new Set<t.TypeOf<RT>>(), (set, a) => insertSetOrdA(a, set))
        return newSet.size !== as.length ? t.failure(as, c) : t.success(newSet)
      },
      sets.toArray(ordA),
      type
    ),
    name
  )
}
