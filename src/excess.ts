import * as t from 'io-ts'
import { either } from 'fp-ts/lib/Either'
import { clone } from './clone'

function getExcessProps(props: t.Props, r: Record<string, unknown>): Array<string> {
  const ex: Array<string> = []
  for (const k of Object.keys(r)) {
    if (!props.hasOwnProperty(k)) {
      ex.push(k)
    }
  }
  return ex
}

type HasExcess = t.InterfaceType<any> | t.PartialType<any>

/**
 * Returns a version of the passed type/interface codec that doesn't allow excess properties,
 * i.e. that, contrary to what `t.type` and `t.exact` do, will reject values passed to `decode` and `is` that
 * have additional properties other than the ones defined by the original codec.
 *
 * Ported from https://github.com/gcanti/io-ts/issues/322#issuecomment-513170377
 *
 * @example
 * import { excess } from 'io-ts-types/lib/excess'
 * import * as t from 'io-ts'
 * import { right } from 'fp-ts/lib/Either'
 * import { PathReporter } from 'io-ts/lib/PathReporter'
 *
 * const T = t.type({ name: t.string })
 * const T1 = t.exact(T)
 * const T2 = excess(T)
 *
 * assert.deepStrictEqual(
 *   T.decode({ name: 'name', surname: 'surname' }),
 *   right({ name: 'name', surname: 'surname' })
 * )
 * assert.deepStrictEqual(
 *   T1.decode({ name: 'name', surname: 'surname' }),
 *   right({ name: 'name' })
 * )
 * assert.deepStrictEqual(
 *   PathReporter.report(T2.decode({ name: 'name', surname: 'surname' })),
 *   ['Invalid value {"name":"name","surname":"surname"} supplied to : { name: string }, excess properties: ["surname"]']
 * )
 *
 * @since 0.6.0
 */
export function excess<C extends HasExcess>(codec: C, name = `excess(${codec.name})`): C {
  const r: any = clone(codec)
  r.is = (u: unknown): u is t.TypeOf<C> => codec.is(u) && getExcessProps(codec.props, u).length === 0
  r.validate = (i: unknown, c: t.Context): t.Validation<t.TypeOf<C>> =>
    either.chain(codec.validate(i, c), r => {
      const ex = getExcessProps(codec.props, r)
      return ex.length > 0
        ? t.failure(
            i,
            c,
            `Invalid value ${JSON.stringify(i)} supplied to : ${codec.name}, excess properties: ${JSON.stringify(ex)}`
          )
        : t.success(i)
    })
  r.decode = (i: unknown) => r.validate(i, [{ key: '', type: r, actual: i }])
  r.name = name
  return r
}
