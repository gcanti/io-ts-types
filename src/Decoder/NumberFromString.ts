/**
 * @since 0.6.0
 */
import * as E from 'fp-ts/lib/Either'
import * as D from 'io-ts/lib/Decoder'

/**
 * @since 0.6.0
 */
export const NumberFromString: D.Decoder<number> = D.parse(D.string, s => {
  const n = parseFloat(s)
  return isNaN(n) ? E.left(`cannot parse ${JSON.stringify(s)} to a number`) : E.right(n)
})
