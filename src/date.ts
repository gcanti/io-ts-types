import * as t from 'io-ts'
import { fromRefinement } from './fromRefinement'

/**
 * @since 0.5.0
 */
export interface DateC extends t.Type<Date, Date, unknown> {}

const isDate = (u: unknown): u is Date => u instanceof Date

/**
 * @since 0.5.0
 */
export const date: DateC = fromRefinement('Date', isDate)
