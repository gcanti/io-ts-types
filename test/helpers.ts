import { Option, isSome } from 'fp-ts/lib/Option'
import { Either, isRight } from 'fp-ts/lib/Either'

export function fromSome<A>(o: Option<A>): A {
  if (isSome(o)) {
    return o.value
  }
  throw new Error(`fromSome called when is None`)
}

export function fromRight<L, A>(e: Either<L, A>): A {
  if (isRight(e)) {
    return e.value
  }
  throw new Error(`fromRight called when is Left ${JSON.stringify(e.value, null, 2)}`)
}
