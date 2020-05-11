/**
 * @since 0.6.0
 */
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

/**
 * @since 0.6.0
 */
export const DateFromString: D.Decoder<Date> = D.parse(D.string, s => {
  const d = new Date(s)
  return isNaN(d.getTime()) ? E.left(`cannot parse ${JSON.stringify(s)} to a Date`) : E.right(d)
})
