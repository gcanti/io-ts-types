import * as t from 'io-ts'

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// tslint:disable-next-line: class-name
export interface uuidC extends t.RefinementType<t.StringType, string, string, unknown> {}

/**
 * @example
 * import { uuid } from 'io-ts-types/lib/string/uuid'
 *
 * uuid.decode('6e9c5587-a342-4b63-a901-87b31fa2ffa3') // right('6e9c5587-a342-4b63-a901-87b31fa2ffa3')
 */
export const uuid: uuidC = t.refinement(t.string, uuid => regex.test(uuid), 'UUID')
