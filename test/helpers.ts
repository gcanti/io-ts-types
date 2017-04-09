import { Option, isSome } from 'fp-ts/lib/Option'

export function fromSome<A>(o: Option<A>): A {
  if (isSome(o)) {
    return o.value
  }
  throw new Error(`fromSome called when is None`)
}
