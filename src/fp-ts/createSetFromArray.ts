import * as t from 'io-ts'
import { toArray, some, every } from 'fp-ts/lib/Set'
import { Ord } from 'fp-ts/lib/Ord'

export class SetFromArrayType<RT extends t.Any, A = any, O = A, I = t.mixed> extends t.Type<A, O, I> {
  readonly _tag: 'SetFromArrayType' = 'SetFromArrayType'
  constructor(
    name: string,
    is: SetFromArrayType<RT, A, O, I>['is'],
    validate: SetFromArrayType<RT, A, O, I>['validate'],
    serialize: SetFromArrayType<RT, A, O, I>['encode'],
    readonly type: RT,
    readonly ordA: Ord<t.TypeOf<RT>>
  ) {
    super(name, is, validate, serialize)
  }
}

export const createSetFromArray = <RT extends t.Type<A, O>, A = any, O = A>(
  type: RT,
  ordA: Ord<t.TypeOf<RT>>,
  name: string = `Set<${type.name}>`
): SetFromArrayType<RT, Set<t.TypeOf<RT>>, Array<t.OutputOf<RT>>, t.mixed> => {
  const ArrayType = t.array(type)
  const equals = ordA.equals
  const setToArray = toArray(ordA)
  return new SetFromArrayType(
    name,
    (m): m is Set<t.TypeOf<RT>> => m instanceof Set && every(m, type.is),
    (m, c) => {
      const validation = ArrayType.validate(m, c)
      if (validation.isLeft()) {
        return validation as any
      } else {
        const as = validation.value
        const len = as.length
        const r = new Set<t.TypeOf<RT>>()
        for (let i = 0; i < len; i++) {
          const a = as[i]
          if (!some(r, x => equals(x, a))) {
            r.add(a)
          }
        }
        return r.size !== len ? t.failure(as, c) : t.success(r)
      }
    },
    s => ArrayType.encode(setToArray(s)),
    type,
    ordA
  )
}
