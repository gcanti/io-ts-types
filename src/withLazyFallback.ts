import * as t from 'io-ts'
import { withValidate } from './withValidate'
import { orElse } from 'fp-ts/lib/Either'

/**
 * Returns a clone of the given codec that always succeed using the given value `a` if the original codec fails
 *
 * @example
 * import { withLazyFallback } from 'io-ts-types/lib/withLazyFallback'
 * import * as t from 'io-ts'
 * import { right } from 'fp-ts/lib/Either'
 *
 * const T = withLazyFallback(t.number, () => -1)
 *
 * assert.deepStrictEqual(T.decode(1), right(1))
 * assert.deepStrictEqual(T.decode('a'), right(-1))
 *
 * @since 0.5.0
 */
export function withLazyFallback<C extends t.Any>(
  codec: C,
  a: () => t.TypeOf<C>,
  name = `withLazyFallback(${codec.name})`
): C {
  return withValidate(codec, (u, c) => orElse(() => t.success(a()))(codec.validate(u, c)), name)
}
