/**
 * @since 0.5.0
 */
import * as t from 'io-ts'
import { either } from 'fp-ts/Either'

/**
 * @since 0.5.0
 */
export interface NumberFromStringC extends t.Type<number, string, unknown> {}

/**
 * @example
 * import { NumberFromString } from 'io-ts-types/lib/NumberFromString'
 *
 * NumberFromString.decode('1') // right(1)
 * NumberFromString.decode('1.1') // right(1.1)
 *
 * @since 0.5.0
 */
export const NumberFromString: NumberFromStringC = new t.Type<number, string, unknown>(
  'NumberFromString',
  t.number.is,
  (u, c) =>
    either.chain(t.string.validate(u, c), s => {
      const n = +s
      return isNaN(n) || s.trim() === '' ? t.failure(u, c) : t.success(n)
    }),
  String
)
