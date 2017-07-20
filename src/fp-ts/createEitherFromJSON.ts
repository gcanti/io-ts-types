import * as t from 'io-ts'
import { Either } from 'fp-ts/lib/Either'
import { createEither } from './createEither'

export type JSONLeft<L> = {
  type: 'Left'
  value: L
}

export type JSONRight<L> = {
  type: 'Right'
  value: L
}

export function createEitherFromJSON<L, A>(left: t.Type<L>, right: t.Type<A>): t.Type<Either<L, A>> {
  const JSONLeft = t.interface({
    type: t.literal('Left'),
    value: left
  })
  const JSONRight = t.interface({
    type: t.literal('Right'),
    value: right
  })
  return t.mapWithName(
    e => e.bimap(v => v.value, v => v.value),
    createEither<JSONLeft<L>, JSONRight<A>>(t.union([JSONLeft, JSONRight]), (v): v is JSONLeft<L> => v.type === 'Left'),
    `Either<${left.name}, ${right.name}>`
  )
}
