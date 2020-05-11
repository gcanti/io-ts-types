/**
 * @since 0.6.0
 */
import * as E from 'io-ts/lib/Encoder'

/**
 * @since 0.6.0
 */
export const DateToISOString: E.Encoder<Date> = {
  encode: d => d.toISOString()
}
