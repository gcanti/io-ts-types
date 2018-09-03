import * as t from 'io-ts'

const TrueOrFalse = t.keyof({
  true: null,
  false: null
})

export class BooleanFromStringType extends t.Type<boolean, string> {
  readonly _tag: 'BooleanFromStringType' = 'BooleanFromStringType'
  constructor() {
    super('BooleanFromString', t.boolean.is, (m, c) => TrueOrFalse.validate(m, c).map(tof => tof === 'true'), String)
  }
}

export const BooleanFromString = new BooleanFromStringType()
