import * as t from 'io-ts'
import { Either, left, right } from 'fp-ts/lib/Either'

export function createEither<L, A>(type: t.Type<L | A>, isLeft: (v: L | A) => v is L): t.Type<Either<L, A>> {
  return t.map(v => isLeft(v) ? left<L, A>(v) : right<L, A>(v), type)
}
