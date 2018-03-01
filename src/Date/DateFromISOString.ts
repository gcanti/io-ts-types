import * as t from 'io-ts'

export class DateFromISOStringType extends t.Type<Date, string> {
  readonly _tag: 'DateFromISOStringType' = 'DateFromISOStringType'
  constructor() {
    super(
      'DateFromISOString',
      (m): m is Date => m instanceof Date,
      (m, c) => {
        const validation = t.string.validate(m, c)
        if (validation.isLeft()) {
          return validation as any
        } else {
          const s = validation.value
          const d = new Date(s)
          return isNaN(d.getTime()) ? t.failure(s, c) : t.success(d)
        }
      },
      a => a.toISOString()
    )
  }
}

export const DateFromISOString = new DateFromISOStringType()
