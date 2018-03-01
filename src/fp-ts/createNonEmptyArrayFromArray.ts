import * as t from 'io-ts'
import { NonEmptyArray, fromArray } from 'fp-ts/lib/NonEmptyArray'

export class NonEmptyArrayFromArrayType<RT extends t.Any, A = any, O = A, I = t.mixed> extends t.Type<A, O, I> {
  readonly _tag: 'NonEmptyArrayFromArrayType' = 'NonEmptyArrayFromArrayType'
  constructor(
    name: string,
    is: NonEmptyArrayFromArrayType<RT, A, O, I>['is'],
    validate: NonEmptyArrayFromArrayType<RT, A, O, I>['validate'],
    serialize: NonEmptyArrayFromArrayType<RT, A, O, I>['encode'],
    readonly type: RT
  ) {
    super(name, is, validate, serialize)
  }
}

export const createNonEmptyArrayFromArray = <RT extends t.Type<A, O>, A = any, O = A>(
  type: RT,
  name: string = `NonEmptyArray<${type.name}>`
): NonEmptyArrayFromArrayType<RT, NonEmptyArray<t.TypeOf<RT>>, Array<t.OutputOf<RT>>, t.mixed> => {
  const ArrayType = t.array(type)
  return new NonEmptyArrayFromArrayType(
    name,
    (m): m is NonEmptyArray<t.TypeOf<RT>> => m instanceof NonEmptyArray && type.is(m.head),
    (m, c) => {
      const validation = ArrayType.validate(m, c)
      if (validation.isLeft()) {
        return validation as any
      } else {
        const as = validation.value
        return fromArray(as).foldL(() => t.failure(as, c), t.success)
      }
    },
    a => ArrayType.encode(a.toArray()),
    type
  )
}
