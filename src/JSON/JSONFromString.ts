import * as t from 'io-ts'

export type JSONObject = { [key: string]: JSON }
export interface JSONArray extends Array<JSON> {}
export type JSON = null | string | number | boolean | JSONArray | JSONObject

export const JSONFromString = new t.Type<JSON>(
  'JSONFromString',
  (v, c) => t.string.validate(v, c).chain(s => {
    try {
      return t.success(JSON.parse(s))
    } catch (e) {
      return t.failure(v, c)
    }
  })
)
