/**
 * @since 0.6.0
 */
import * as G from 'io-ts/lib/Guard'

const _RegExp: G.Guard<RegExp> = {
  is: (u): u is RegExp => Object.prototype.toString.call(u) === '[object RegExp]'
}

export {
  /**
   * @since 0.6.0
   */
  _RegExp as RegExp
}
