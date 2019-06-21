import * as t from 'io-ts'
import { either } from 'fp-ts/lib/Either'

/**
 * @since 0.5.0
 */
export interface BooleanFromStringC extends t.Type<boolean, string, unknown> {}

/**
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
