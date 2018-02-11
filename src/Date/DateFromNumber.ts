import * as t from 'io-ts'

export const DateFromNumber = new t.Type<Date, number>(
  'DateFromNumber',
  (m): m is Date => m instanceof Date,
  (m, c) =>
    t.number.validate(m, c).chain(n => {
      const d = new Date(n)
      return isNaN(d.getTime()) ? t.failure(n, c) : t.success(d)
    }),
  a => a.getTime()
)
