import * as t from 'io-ts'

export class DateType extends t.Type<Date, Date, unknown> {
  readonly _tag: 'DateType' = 'DateType'
  constructor() {
    super(
      'Date',
      (u): u is Date => u instanceof Date,
      (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)),
      t.identity
    )
  }
}

export interface DateC extends DateType {}

/**
 * @example
 * import { date } from 'io-ts-types/lib/Date/date'
 * import { right } from 'fp-ts/lib/Either'
 *
 * const input = new Date(1973, 10, 30)
 * assert.deepStrictEqual(date.decode(input), right(input))
 */
export const date: DateC = new DateType()
