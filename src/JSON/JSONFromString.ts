import * as t from 'io-ts'
import { JSONType, JSONTypeRT } from './JSONTypeRT'
import { tryCatch } from 'fp-ts/lib/Either'

export type JSONType = JSONType

export class JSONFromStringType extends t.Type<JSONType> {
  readonly _tag: 'JSONFromStringType' = 'JSONFromStringType'
  constructor() {
    super(
      'JSONFromString',
      JSONTypeRT.is,
      (m, c) => {
        const validation = t.string.validate(m, c)
        if (validation.isLeft()) {
          return validation as any
        } else {
          const s = validation.value
          // tslint:disable-next-line: deprecation
          return tryCatch(() => JSON.parse(s)).fold(() => t.failure(s, c), t.success)
        }
      },
      JSON.stringify
    )
  }
}

export interface JSONFromStringC extends JSONFromStringType {}

export const JSONFromString: JSONFromStringC = new JSONFromStringType()
