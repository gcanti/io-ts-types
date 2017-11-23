import * as t from 'io-ts'
import { JSONType } from '../monocle-ts/StringJSONPrism'

export type JSONType = JSONType

export const JSONTypeRT = t.recursion<JSONType>('JSONType', Self =>
  t.union([t.null, t.string, t.number, t.boolean, t.array(Self), t.dictionary(t.string, Self)])
)
