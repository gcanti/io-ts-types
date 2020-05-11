/**
 * @since 0.6.0
 */
import * as D from 'io-ts/lib/Decoder'
import * as G from '../Guard/Date'

const _Date = D.fromGuard(G.Date, 'Date')

export {
  /**
   * @since 0.6.0
   */
  _Date as Date
}
