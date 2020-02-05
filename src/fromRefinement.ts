/**
 * @since 0.4.4
 */
import * as t from 'io-ts'

/**
 * Returns a codec from a refinement
 *
 * @since 0.4.4
 */
export function fromRefinement<A>(name: string, is: (u: unknown) => u is A): t.Type<A, A, unknown> {
  return new t.Type(name, is, (u, c) => (is(u) ? t.success(u) : t.failure(u, c)), t.identity)
}
