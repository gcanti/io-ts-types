import * as t from 'io-ts'

export class DateFromNumberType extends t.Type<Date, number> {
  readonly _tag: 'DateFromNumberType' = 'DateFromNumberType'
  constructor() {
    super(
      'DateFromNumber',
      (m): m is Date => m instanceof Date,
      (m, c) => {
        const validation = t.number.validate(m, c)
        if (validation.isLeft()) {
          return validation as any
        } else {
          const n = validation.value
          const d = new Date(n)
          return isNaN(d.getTime()) ? t.failure(n, c) : t.success(d)
        }
      },
      a => a.getTime()
    )
  }
}

export const DateFromNumber = new DateFromNumberType()
