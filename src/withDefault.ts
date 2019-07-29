import * as t from 'io-ts'

/**
 * Returns a default value if the input is `null`-ish.
 *
 * @example
 * import { withDefault } from 'io-ts-types/lib/withDefault'
 * import * as t from 'io-ts'
 * import { right } from 'fp-ts/lib/Either'
 *
 * const T = withDefault(t.number, -1)
 *
 * assert.deepStrictEqual(T.decode(1), right(1))
 * assert.deepStrictEqual(T.decode(undefined), right(-1))
 * assert.deepStrictEqual(T.decode(null), right(-1))
 *
 * @since 0.6.0
 */
export function withDefault<T extends t.Mixed>(
  type: T,
  defaultValue: t.TypeOf<T>,
  name = `${type.name} = ${JSON.stringify(defaultValue)}`
): t.Type<t.TypeOf<T>, t.TypeOf<T>, unknown> {
  return new t.Type(name, type.is, v => type.decode(v != null ? v : defaultValue), type.encode)
}
