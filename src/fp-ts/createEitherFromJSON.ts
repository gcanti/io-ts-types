import * as t from 'io-ts'

import { Either, Right, Left, left, right } from 'fp-ts/lib/Either'

export interface JSONLeft<L> {
  type: 'Left'
  value: L
}

export interface JSONRight<A> {
  type: 'Right'
  value: A
}

export type JSONEither<L, A> = JSONLeft<L> | JSONRight<A>

export function createEitherFromJSON<L, IL, A, IA>(
  leftType: t.Type<L, IL>,
  rightType: t.Type<A, IA>
): t.Type<Either<L, A>, JSONEither<IL, IA>> {
  const JSONLeft = t.type({
    type: t.literal('Left'),
    value: leftType
  })
  const JSONRight = t.type({
    type: t.literal('Right'),
    value: rightType
  })
  const JSONEither = t.taggedUnion('type', [JSONLeft, JSONRight])
  return new t.Type(
    `Either<${leftType.name}, ${rightType.name}>`,
    (m): m is Either<L, A> =>
      (m instanceof Right && rightType.is(m.value)) || (m instanceof Left && leftType.is(m.value)),
    (m, c) =>
      JSONEither.validate(m, c).chain(e => {
        switch (e.type) {
          case 'Left':
            return t.success(left(e.value))
          case 'Right':
            return t.success(right(e.value))
        }
      }),
    a =>
      a.fold<JSONEither<IL, IA>>(
        l => ({ type: 'Left', value: leftType.encode(l) }),
        a => ({ type: 'Right', value: rightType.encode(a) })
      )
  )
}
