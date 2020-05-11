/**
 * @since 0.6.0
 */
import * as D from 'io-ts/lib/Decoder'
import * as G from '../Guard/NonEmptyString'

/**
 * @since 0.6.0
 */
export type NonEmptyString = G.NonEmptyString

/**
 * @since 0.6.0
 */
export const NonEmptyString: D.Decoder<NonEmptyString> = D.fromGuard(G.NonEmptyString, 'NonEmptyString')
