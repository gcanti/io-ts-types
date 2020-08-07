/**
 * @since 0.4.3
 */
import * as t from 'io-ts'
import { clone } from './clone'

/**
 * Returns a clone of the given codec which uses the given `validate` function
 *
 * @example
 * import { withValidate } from 'io-ts-types/lib/withValidate'
 * import * as t from 'io-ts'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 * import { either, right } from 'fp-ts/Either'
 *
 * const T = withValidate(t.number, (u, c) => either.map(t.number.validate(u, c), n => n * 2))
 *
 * assert.deepStrictEqual(T.decode(1), right(2))
 * assert.deepStrictEqual(PathReporter.report(T.decode(null)), ['Invalid value null supplied to : number'])
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
