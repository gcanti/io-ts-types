/**
 * @since 0.6.0
 */
import * as G from 'io-ts/lib/Guard'

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

interface UUIDBrand {
  readonly UUID: unique symbol
}

/**
 * @since 0.6.0
 */
export type UUID = string & UUIDBrand

/**
 * @since 0.6.0
 */
export const UUID: G.Guard<UUID> = G.refinement(G.string, (s): s is UUID => regex.test(s))
