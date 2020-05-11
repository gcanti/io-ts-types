/**
 * @since 0.6.0
 */
import * as G from 'io-ts/lib/Guard'

interface IntBrand {
  readonly Int: unique symbol
}

/**
 * @since 0.6.0
 */
export type Int = number & IntBrand

/**
 * @since 0.6.0
 */
export const Int: G.Guard<Int> = G.refinement(G.number, (n): n is Int => Number.isInteger(n))
