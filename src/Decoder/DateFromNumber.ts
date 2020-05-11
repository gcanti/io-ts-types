/**
 * @since 0.6.0
 */
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

/**
 * @since 0.6.0
 */
export const DateFromNumber: D.Decoder<Date> = D.parse(D.number, n => {
  const d = new Date(n)
  return isNaN(d.getTime()) ? E.left(`cannot parse ${n} to a Date`) : E.right(d)
})
