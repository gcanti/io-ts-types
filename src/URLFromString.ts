/**
 * @since 0.5.17
 */
import * as t from 'io-ts'
import { pipe } from 'fp-ts/lib/pipeable'
import { chain } from 'fp-ts/lib/Either'

declare const URL: any

/**
 * @since 0.5.17
 */
export interface URLFromStringC extends t.Type<typeof URL, string, unknown> {}

/**
 * @example
 * import { URLFromString } from 'io-ts-types/lib/URLFromString'
 * import { right } from 'fp-ts/lib/Either'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 *
 * assert.deepStrictEqual(URLFromString.decode('https://gcanti.github.io/io-ts-types/'), right(new URL('https://gcanti.github.io/io-ts-types/')))
 * assert.deepStrictEqual(PathReporter.report(URLFromString.decode('/djulio')), ['Invalid value "/djulio" supplied to : URLFromString'])
 *
 *
 * @since 0.5.17
 */
export const URLFromString: URLFromStringC = new t.Type<typeof URL, string, unknown>(
  'URLFromString',
  (u): u is typeof URL => u instanceof URL,
  (u, c) =>
    pipe(
      t.string.validate(u, c),
      chain(s => {
        try {
          return t.success(new URL(s))
        } catch (error) {
          return t.failure(u, c)
        }
      })
    ),
  String
)
