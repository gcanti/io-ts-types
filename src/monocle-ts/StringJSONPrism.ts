import { Prism } from 'monocle-ts'
import { tryCatch } from 'fp-ts/lib/Either'

export type JSONObject = { [key: string]: JSONType }
export interface JSONArray extends Array<JSONType> {}
export type JSONType = null | string | number | boolean | JSONArray | JSONObject

export const StringJSONPrism = new Prism<string, JSONType>(
  s => tryCatch(() => JSON.parse(s)).toOption(),
  a => JSON.stringify(a)
)
