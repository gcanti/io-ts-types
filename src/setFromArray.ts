/**
 * @since 0.5.0
 */
import { Ord } from 'fp-ts/Ord'
import { every, fromArray, toArray } from 'fp-ts/Set'
import * as t from 'io-ts'
import { either } from 'fp-ts/Either'

/**
 * @since 0.5.0
 */
export interface SetFromArrayC<C extends t.Mixed> extends t.Type<Set<t.TypeOf<C>>, Array<t.OutputOf<C>>, unknown> {}

/**
 * @since 0.5.0
 */
export function setFromArray<C extends t.Mixed>(
  codec: C,
  O: Ord<t.TypeOf<C>>,
  name: string = `Set<${codec.name}>`
): SetFromArrayC<C> {
  const arr = t.array(codec)
  const toArrayO = toArray(O)
  const fromArrayO = fromArray(O)
  return new t.Type(
    name,
    (u): u is Set<t.TypeOf<C>> => u instanceof Set && every(codec.is)(u),
    (u, c) =>
      either.chain(arr.validate(u, c), as => {
        const set = fromArrayO(as)
        return set.size !== as.length ? t.failure(u, c) : t.success(set)
      }),
    set => arr.encode(toArrayO(set))
  )
}
