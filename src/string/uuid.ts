import * as t from 'io-ts'

const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const uuid = t.refinement(t.string, uuid => regex.test(uuid), 'UUID')
