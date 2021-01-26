/**
 * @since 0.5.0
 */
import * as t from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { chain } from 'fp-ts/lib/Either'

/**
 * @since 0.5.0
 */
export interface DateFromNumberC extends t.Type<Date, number, unknown> {}

/**
 * @example
 * import { DateFromNumber } from 'io-ts-types/lib/DateFromNumber'
 * import { right } from 'fp-ts/lib/Either'
 *
 * const date = new Date(1973, 10, 30)
 * const input = date.getTime()
 * assert.deepStrictEqual(DateFromNumber.decode(input), right(date))
 *
 * @since 0.5.0
 */
export const DateFromNumber: DateFromNumberC = new t.Type<Date, number, unknown>(
  'DateFromNumber',
  (u): u is Date => u instanceof Date,
  (u, c) =>
    pipe(
      t.number.validate(u, c),
      chain(n => {
        const d = new Date(n)
        return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d)
      })
    ),
  a => a.getTime()
)
