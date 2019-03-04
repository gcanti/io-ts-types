import * as t from 'io-ts'

export class DateFromNumberType extends t.Type<Date, number, unknown> {
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

/**
 * @example
 * import { DateFromNumber } from 'io-ts-types/lib/Date/DateFromNumber'
 * import { right } from 'fp-ts/lib/Either'
 *
 * const date = new Date(1973, 10, 30)
 * const input = date.getTime()
 * assert.deepStrictEqual(DateFromNumber.decode(input), right(date))
 */
export const DateFromNumber: DateFromNumberC = new DateFromNumberType()
