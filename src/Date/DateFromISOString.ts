import * as t from 'io-ts'

export const DateFromISOString = new t.Type<Date, string>(
  'DateFromISOString',
  (m): m is Date => m instanceof Date,
  (m, c) =>
    t.string.validate(m, c).chain(s => {
      const d = new Date(s)
      return isNaN(d.getTime()) ? t.failure(s, c) : t.success(d)
    }),
  a => a.toISOString()
)
