import * as t from 'io-ts'
import { NonEmptyArray, fromArray } from 'fp-ts/lib/NonEmptyArray'

export class NonEmptyArrayFromArrayType<C extends t.Any, A = any, O = A, I = t.mixed> extends t.Type<A, O, I> {
  readonly _tag: 'NonEmptyArrayFromArrayType' = 'NonEmptyArrayFromArrayType'
  constructor(
    name: string,
    is: NonEmptyArrayFromArrayType<C, A, O, I>['is'],
    validate: NonEmptyArrayFromArrayType<C, A, O, I>['validate'],
    serialize: NonEmptyArrayFromArrayType<C, A, O, I>['encode'],
    readonly type: C
  ) {
    super(name, is, validate, serialize)
  }
}

export interface NonEmptyArrayFromArrayC<C extends t.Mixed>
  extends NonEmptyArrayFromArrayType<C, NonEmptyArray<t.TypeOf<C>>, Array<t.OutputOf<C>>, t.mixed> {}

export const createNonEmptyArrayFromArray = <C extends t.Mixed>(
  codec: C,
  name: string = `NonEmptyArray<${codec.name}>`
): NonEmptyArrayFromArrayC<C> => {
  const ArrayType = t.array(codec)
  return new NonEmptyArrayFromArrayType(
    name,
    (m): m is NonEmptyArray<t.TypeOf<C>> => m instanceof NonEmptyArray && codec.is(m.head),
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
    codec
  )
}
