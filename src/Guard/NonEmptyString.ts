/**
 * @since 0.6.0
 */
import * as G from 'io-ts/lib/Guard'

interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol
}

/**
 * @since 0.6.0
 */
export type NonEmptyString = string & NonEmptyStringBrand

/**
 * @since 0.6.0
 */
export const NonEmptyString: G.Guard<NonEmptyString> = G.refinement(G.string, (s): s is NonEmptyString => s.length > 0)
