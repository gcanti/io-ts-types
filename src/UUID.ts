import * as t from 'io-ts'

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export interface UUIDBrand {
  readonly UUID: unique symbol
}

export type UUID = t.Branded<string, UUIDBrand>

export interface UUIDC extends t.Type<UUID, string, unknown> {}

/**
 * @example
 * import { UUID } from 'io-ts-types/lib/UUID'
 * import { right } from 'fp-ts/lib/Either'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 *
 * assert.deepStrictEqual(UUID.decode('00000000-0000-0000-0000-000000000000'), right('00000000-0000-0000-0000-000000000000'))
 * assert.deepStrictEqual(PathReporter.report(UUID.decode('not a uuid')), ['Invalid value "not a uuid" supplied to : UUID'])
 */
export const UUID = t.brand(t.string, (s): s is UUID => regex.test(s), 'UUID')
