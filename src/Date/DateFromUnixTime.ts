import * as t from 'io-ts'

export class DateFromUnixTimeType extends t.Type<Date, number, unknown> {
  readonly _tag: 'DateFromUnixTimeType' = 'DateFromUnixTimeType'
  constructor() {
    super(
      'DateFromUnixTime',
      (u): u is Date => u instanceof Date,
      (u, c) => {
        // tslint:disable-next-line: deprecation
        const validation = t.Integer.validate(u, c)
        if (validation.isLeft()) {
          return validation as any
        } else {
          return t.success(new Date(validation.value * 1000))
        }
      },
      a => a.getTime() / 1000
    )
  }
}

export interface DateFromUnixTimeC extends DateFromUnixTimeType {}

/**
 * @example
 * import { DateFromUnixTime } from 'io-ts-types/lib/Date/DateFromUnixTime'
 * import { right } from 'fp-ts/lib/Either'
 *
 * const date = new Date(1973, 10, 30)
 * const input = date.getTime() / 1000
 * assert.deepStrictEqual(DateFromUnixTime.decode(input), right(date))
 */
export const DateFromUnixTime: DateFromUnixTimeC = new DateFromUnixTimeType()
