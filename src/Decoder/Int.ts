/**
 * @since 0.6.0
 */
import * as D from 'io-ts/lib/Decoder'
import * as G from '../Guard/Int'

/**
 * @since 0.6.0
 */
export type Int = G.Int

/**
 * @since 0.6.0
 */
export const Int: D.Decoder<Int> = D.fromGuard(G.Int, 'Int')
