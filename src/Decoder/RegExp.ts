/**
 * @since 0.6.0
 */
import * as D from 'io-ts/lib/Decoder'
import * as G from '../Guard/RegExp'

const _RegExp = D.fromGuard(G.RegExp, 'RegExp')

export {
  /**
   * @since 0.6.0
   */
  _RegExp as RegExp
}
