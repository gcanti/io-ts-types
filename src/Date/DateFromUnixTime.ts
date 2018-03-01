import * as t from 'io-ts'

export class DateFromUnixTimeType extends t.Type<Date, number> {
  readonly _tag: 'DateFromUnixTimeType' = 'DateFromUnixTimeType'
  constructor() {
    super(
      'DateFromUnixTime',
      (m): m is Date => m instanceof Date,
      (m, c) => {
        const validation = t.Integer.validate(m, c)
        if (validation.isLeft()) {
          return validation as any
        } else {
          const n = validation.value
          const d = new Date(n * 1000)
          return isNaN(d.getTime()) ? t.failure(n, c) : t.success(d)
        }
      },
      a => a.getTime() / 1000
    )
  }
}

export const DateFromUnixTime = new DateFromUnixTimeType()
