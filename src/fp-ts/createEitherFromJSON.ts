import * as t from 'io-ts'
import { Either, left, right } from 'fp-ts/lib/Either'

export type JSONLeft<L> = {
  type: 'Left'
  value: L
}

export type JSONRight<A> = {
  type: 'Right'
  value: A
}

export type JSONEither<L, A> = JSONLeft<L> | JSONRight<A>

export function createEitherFromJSON<L, A>(
  leftType: t.Type<t.mixed, L>,
  rightType: t.Type<t.mixed, A>
): t.Type<t.mixed, Either<L, A>> {
  const JSONLeft = t.interface({
    type: t.literal('Left'),
    value: leftType
  })
  const JSONRight = t.interface({
    type: t.literal('Right'),
    value: rightType
  })
  const JSONEither = t.union([JSONLeft, JSONRight])
  return new t.Type(
    `Either<${leftType.name}, ${rightType.name}>`,
    (v): v is Either<L, A> => leftType.is(v) || rightType.is(v),
    (s, c) =>
      JSONEither.validate(s, c).chain(e => {
        switch (e.type) {
          case 'Left':
            return t.success(left(e.value))
          case 'Right':
            return t.success(right(e.value))
        }
      }),
    a => a.fold<JSONEither<L, A>>(l => ({ type: 'Left', value: l }), a => ({ type: 'Right', value: a }))
  )
}
