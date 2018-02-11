import * as t from 'io-ts'

export const NumberFromString = new t.Type<number, string>(
  'NumberFromString',
  t.number.is,
  (m, c) =>
    t.string.validate(m, c).chain(s => {
      const n = parseFloat(s)
      return isNaN(n) ? t.failure(s, c) : t.success(n)
    }),
  String
)
