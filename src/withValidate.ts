/**
 * @since 0.4.3
 */
import * as t from 'io-ts'
import { clone } from './clone'

/**
 * Returns a clone of the given codec which uses the given `validate` function
 *
 * @example
 * import { pipe } from 'fp-ts/lib/function'
 * import { withValidate } from 'io-ts-types/lib/withValidate'
 * import * as t from 'io-ts'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 * import * as E from 'fp-ts/lib/Either'
 *
 * const minString = (min: number) => withValidate(t.string, (u, c) => pipe(t.string.validate(u, c), E.chain(x => x.length >= min ? t.success(x): t.failure(u, c, `string must be at least ${min} characters`))))
 *
 * assert.deepStrictEqual(minString(3).decode("test"), E.right("test"))
 * assert.deepStrictEqual(PathReporter.report(minString(3).decode("te")), ['string must be at least 3 characters'])
 *
 * @since 0.4.3
 */
export function withValidate<C extends t.Any>(codec: C, validate: C['validate'], name: string = codec.name): C {
  const r: any = clone(codec)
  r.validate = validate
  // tslint:disable-next-line: deprecation
  r.decode = (i: any) => validate(i, t.getDefaultContext(r))
  r.name = name
  return r
}
