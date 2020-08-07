/**
 * @since 0.4.4
 */
import * as t from 'io-ts'
import { NumberFromString } from './NumberFromString'
import { either } from 'fp-ts/Either'

/**
 * @since 0.4.4
 */
export interface IntFromStringC extends t.Type<t.Int, string, unknown> {}

/**
 * A codec that succeeds if a string can be parsed to an integer
 *
 * @example
 * import { IntFromString } from 'io-ts-types/lib/IntFromString'
 * import { right } from 'fp-ts/Either'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 *
 * assert.deepStrictEqual(IntFromString.decode('1'), right(1))
 * assert.deepStrictEqual(PathReporter.report(IntFromString.decode('1.1')), ['Invalid value "1.1" supplied to : IntFromString'])
 *
 * @since 0.4.4
 */
export const IntFromString: IntFromStringC = new t.Type<t.Int, string, unknown>(
  'IntFromString',
  t.Int.is,
  (u, c) => either.chain(NumberFromString.validate(u, c), n => (t.Int.is(n) ? t.success(n) : t.failure(u, c))),
  NumberFromString.encode
)
