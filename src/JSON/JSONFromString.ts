import * as t from 'io-ts'
import { JSONType, JSONTypeRT } from './JSONTypeRT'
import { tryCatch } from 'fp-ts/lib/Either'

export type JSONType = JSONType

export const JSONFromString = new t.Type<JSONType>(
  'JSONFromString',
  JSONTypeRT.is,
  (m, c) => t.string.validate(m, c).chain(s => tryCatch(() => JSON.parse(s)).fold(() => t.failure(s, c), t.success)),
  JSON.stringify
)
