import * as t from 'io-ts'

export type JSONObject = { [key: string]: JSONType }
export interface JSONArray extends Array<JSONType> {}
export type JSONType = null | string | number | boolean | JSONArray | JSONObject

export interface JSONTypeC extends t.RecursiveType<t.Type<JSONType>> {}

export const JSONTypeRT: JSONTypeC = t.recursion<JSONType>('JSONType', Self =>
  t.union([t.null, t.string, t.number, t.boolean, t.array(Self), t.record(t.string, Self)])
)
