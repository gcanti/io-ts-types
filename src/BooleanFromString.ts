/**
 * @since 0.5.0
 */
import * as t from 'io-ts'
import { either } from 'fp-ts/lib/Either'

/**
 * @since 0.5.0
 */
export interface BooleanFromStringC extends t.Type<boolean, string, unknown> {}

/**
 * @example
 * import { BooleanFromString } from 'io-ts-types/lib/BooleanFromString'
 * import { right } from 'fp-ts/lib/Either'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 *
 * assert.deepStrictEqual(BooleanFromString.decode('true'), right(true))
 * assert.deepStrictEqual(BooleanFromString.decode('false'), right(false))
 * assert.deepStrictEqual(PathReporter.report(BooleanFromString.decode('a')), ['Invalid value "a" supplied to : BooleanFromString'])
 *
 * @since 0.5.0
 */
export const BooleanFromString: BooleanFromStringC = new t.Type<boolean, string, unknown>(
  'BooleanFromString',
  t.boolean.is,
  (u, c) =>
    either.chain(t.string.validate(u, c), s =>
      s === 'true' ? t.success(true) : s === 'false' ? t.success(false) : t.failure(u, c)
    ),
  String
)
