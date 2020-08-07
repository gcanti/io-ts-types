/**
 * @since 0.4.6
 */
import * as t from 'io-ts'

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * @since 0.4.6
 */
export interface UUIDBrand {
  readonly UUID: unique symbol
}

/**
 * @since 0.4.6
 */
export type UUID = t.Branded<string, UUIDBrand>

/**
 * @example
 * import { UUID } from 'io-ts-types/lib/UUID'
 * import { right } from 'fp-ts/Either'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 *
 * assert.deepStrictEqual(UUID.decode('00000000-0000-0000-0000-000000000000'), right('00000000-0000-0000-0000-000000000000'))
 * assert.deepStrictEqual(PathReporter.report(UUID.decode('not a uuid')), ['Invalid value "not a uuid" supplied to : UUID'])
 *
 * @since 0.4.6
 */
export const UUID = t.brand(t.string, (s): s is UUID => regex.test(s), 'UUID')
