import * as t from 'io-ts'

export class DateFromNumberType extends t.Type<Date, number, t.mixed> {
  readonly _tag: 'DateFromNumberType' = 'DateFromNumberType'
  constructor() {
    super(
      'DateFromNumber',
      (u): u is Date => u instanceof Date,
      (u, c) => {
        const validation = t.number.validate(u, c)
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

export interface DateFromNumberC extends DateFromNumberType {}

export const DateFromNumber: DateFromNumberC = new DateFromNumberType()
