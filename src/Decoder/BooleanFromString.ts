/**
 * @since 0.6.0
 */
import * as D from 'io-ts/lib/Decoder'

/**
 * @since 0.6.0
 */
export const BooleanFromString: D.Decoder<boolean> = D.decoder.map(D.literal('true', 'false'), s => s === 'true')
