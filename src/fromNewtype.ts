/**
 * @since 0.5.2
 */
import { AnyNewtype, CarrierOf, iso } from 'newtype-ts'
import * as t from 'io-ts'
import { either } from 'fp-ts/lib/Either'

/**
 * Returns a codec from a newtype
 *
 * @example
 * import { fromNewtype } from 'io-ts-types/lib/fromNewtype'
 * import * as t from 'io-ts'
 * import { right } from 'fp-ts/lib/Either'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 * import { Newtype, iso } from 'newtype-ts'
 *
 * interface Token extends Newtype<{ readonly Token: unique symbol }, string> {}
 *
 * const T = fromNewtype<Token>(t.string)
 *
 * assert.deepStrictEqual(T.decode('sometoken'), right(iso<Token>().wrap('sometoken')))
 * assert.deepStrictEqual(PathReporter.report(T.decode(42)), ['Invalid value 42 supplied to : fromNewtype(string)'])
 *
 * @since 0.5.2
 */
export function fromNewtype<N extends AnyNewtype = never>(
  codec: t.Type<CarrierOf<N>, t.OutputOf<CarrierOf<N>>>,
  name = `fromNewtype(${codec.name})`
): t.Type<N, CarrierOf<N>, unknown> {
  const i = iso<N>()
  return new t.Type(
    name,
    (u): u is N => codec.is(u),
    (u, c) => either.map(codec.validate(u, c), i.wrap),
    a => codec.encode(i.unwrap(a))
  )
}
