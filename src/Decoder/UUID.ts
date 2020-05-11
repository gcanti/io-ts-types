/**
 * @since 0.6.0
 */
import * as D from 'io-ts/lib/Decoder'
import * as G from '../Guard/UUID'

/**
 * @since 0.6.0
 */
export type UUID = G.UUID

/**
 * @since 0.6.0
 */
export const UUID: D.Decoder<UUID> = D.fromGuard(G.UUID, 'UUID')
