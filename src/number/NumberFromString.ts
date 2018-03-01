import * as t from 'io-ts'

export class NumberFromStringType extends t.Type<number, string> {
  readonly _tag: 'NumberFromStringType' = 'NumberFromStringType'
  constructor() {
    super(
      'NumberFromString',
      t.number.is,
      (m, c) => {
        const validation = t.string.validate(m, c)
        if (validation.isLeft()) {
          return validation as any
        } else {
          const s = validation.value
          const n = parseFloat(s)
          return isNaN(n) ? t.failure(s, c) : t.success(n)
        }
      },
      String
    )
  }
}

export const NumberFromString = new NumberFromStringType()
