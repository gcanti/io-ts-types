import * as t from 'io-ts'
import { Option, none, some, None, Some } from 'fp-ts/lib/Option'

export type JSONOption<A> = { _tag: 'None' } | { _tag: 'Some'; value: A }

const jnone: JSONOption<never> = { _tag: 'None' }

const jsome = <A>(value: A): JSONOption<A> => ({ _tag: 'Some', value })

export interface OptionFromJSONC<C extends t.Mixed>
  extends t.Type<Option<t.TypeOf<C>>, JSONOption<t.OutputOf<C>>, unknown> {}

/**
 * Given a codec representing a type `A`, returns a codec representing `Option<A>` that is able to deserialize
 * the JSON representation of an `Option`.
 *
 * @example
 * import { optionFromJSON } from 'io-ts-types/lib/optionFromJSON'
 * import { right } from 'fp-ts/lib/Either'
 * import { Option, none, some } from 'fp-ts/lib/Option'
 * import * as t from 'io-ts'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 *
 * const toJSON = <A>(ma: Option<A>): unknown => JSON.parse(JSON.stringify(ma))
 *
 * const T = optionFromJSON(t.number)
 *
 * assert.deepStrictEqual(T.decode(toJSON(none)), right(none))
 * assert.deepStrictEqual(T.decode(toJSON(some(1))), right(some(1)))
 * assert.deepStrictEqual(PathReporter.report(T.decode(some('a'))), ['Invalid value "a" supplied to : Option<number>/value: number'])
 *
 * @since 0.4.4
 */
export function optionFromJSON<C extends t.Mixed>(
  codec: C,
  name: string = `Option<${codec.name}>`
): OptionFromJSONC<C> {
  const someC = t.type({
    value: codec
  })
  return new t.Type(
    name,
    (u): u is Option<t.TypeOf<C>> => u instanceof None || (u instanceof Some && codec.is(u.value)),
    (u, c) =>
      t.UnknownRecord.validate(u, c).chain(o => {
        if (o._tag === 'None') {
          return t.success(none)
        } else if (o._tag === 'Some') {
          return someC.validate(o, c).map(s => some(s.value))
        } else {
          return t.failure(u, c)
        }
      }),
    a => a.fold(jnone, a => jsome(codec.encode(a)))
  )
}
