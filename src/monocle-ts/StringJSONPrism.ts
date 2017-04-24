import { Prism } from 'monocle-ts'
import { tryCatch } from 'fp-ts/lib/Either'

export type JSONObject = { [key: string]: JSON }
export interface JSONArray extends Array<JSON> {}
export type JSON = null | string | number | boolean | JSONArray | JSONObject

export const StringJSONPrism = new Prism<string, JSON>(
  s => tryCatch(() => JSON.parse(s)).toOption(),
  a => JSON.stringify(a)
)
