import * as t from 'io-ts'

export const DateFromUnixTime = new t.Type<Date, number>(
  'DateFromUnixTime',
  (m): m is Date => m instanceof Date,
  (m, c) =>
    t.Integer.validate(m, c).chain(n => {
      const d = new Date(n * 1000)
      return isNaN(d.getTime()) ? t.failure(n, c) : t.success(d)
    }),
  a => a.getTime() / 1000
)
