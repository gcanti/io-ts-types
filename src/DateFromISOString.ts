/**
 * @since 0.5.0
 */
import * as t from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { chain } from 'fp-ts/lib/Either'

/**
 * @since 0.5.0
 */
export interface DateFromISOStringC extends t.Type<Date, string, unknown> {}

/**
 * @example
 * import { DateFromISOString } from 'io-ts-types/lib/DateFromISOString'
 * import { right } from 'fp-ts/lib/Either'
 *
 * const date = new Date(1973, 10, 30)
 * const input = date.toISOString()
 * assert.deepStrictEqual(DateFromISOString.decode(input), right(date))
 *
 * @since 0.5.0
 */
export const DateFromISOString: DateFromISOStringC = new t.Type<Date, string, unknown>(
  'DateFromISOString',
  (u): u is Date => u instanceof Date,
  (u, c) =>
    pipe(
      t.string.validate(u, c),
      chain(s => {
        const d = new Date(s)
        return isNaN(d.getTime()) ? t.failure(u, c) : t.success(d)
      })
    ),
  a => a.toISOString()
)
