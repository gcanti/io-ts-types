import * as t from 'io-ts'

export class DateFromISOStringType extends t.Type<Date, string, t.mixed> {
  readonly _tag: 'DateFromISOStringType' = 'DateFromISOStringType'
  constructor() {
    super(
      'DateFromISOString',
      (u): u is Date => u instanceof Date,
      (u, c) => {
        const validation = t.string.validate(u, c)
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

export interface DateFromISOStringC extends DateFromISOStringType {}

/**
 * @example
 * import { DateFromISOString } from 'io-ts-types/lib/Date/DateFromISOString'
 * import { right } from 'fp-ts/lib/Either'
 *
 * const date = new Date(1973, 10, 30)
 * const input = date.toISOString()
 * assert.deepStrictEqual(DateFromISOString.decode(input), right(date))
 */
export const DateFromISOString: DateFromISOStringC = new DateFromISOStringType()
