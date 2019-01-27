import * as t from 'io-ts'

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// tslint:disable-next-line: class-name
export interface uuidC extends t.RefinementType<t.StringType, string, string, unknown> {}

export const uuid: uuidC = t.refinement(t.string, uuid => regex.test(uuid), 'UUID')
