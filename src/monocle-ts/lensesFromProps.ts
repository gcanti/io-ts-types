import * as t from 'io-ts'
import { Lens } from 'monocle-ts'

export type LensesFromProps<P extends t.Props> = { [K in keyof P]: Lens<t.TypeOfProps<P>, t.TypeOfProps<P>[K]> }

/**
 * Return a `Lens` for each prop
 *
 * @example
 * import * as t from 'io-ts'
 * import { lensesFromProps } from 'io-ts-types/lib/monocle-ts/lensesFromProps'
 *
 * const lenses = lensesFromProps({
 *   name: t.string,
 *   age: t.number
 * })
 *
 * assert.strictEqual(lenses.age.get({ name: 'Giulio', age: 44 }), 44)
 */
export const lensesFromProps = <P extends t.Props>(
  props: P
): { [K in keyof P]: Lens<t.TypeOfProps<P>, t.TypeOfProps<P>[K]> } => {
  const r: any = {}
  for (const k in props) {
    r[k] = (Lens.fromProp as any)(k)
  }
  return r
}
