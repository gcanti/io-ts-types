/**
 * @since 0.6.0
 */
import * as D from 'io-ts/lib/Decoder'
import { Int } from '../Guard/Int'
import { NumberFromString } from './NumberFromString'

/**
 * @since 0.6.0
 */
export const IntFromString: D.Decoder<Int> = D.refinement(NumberFromString, Int.is, 'Int')
