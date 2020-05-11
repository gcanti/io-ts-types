/**
 * @since 0.6.0
 */
import * as G from 'io-ts/lib/Guard'

const _Date: G.Guard<Date> = {
  is: (u): u is Date => u instanceof Date
}

export {
  /**
   * @since 0.6.0
   */
  _Date as Date
}
