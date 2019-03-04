import * as t from 'io-ts'
import { lensesFromProps } from './lensesFromProps'
import { Lens } from 'monocle-ts'

/**
 * Return a `Lens` for each prop
 *
 * @example
 * import * as t from 'io-ts'
 * import { lensesFromInterface } from 'io-ts-types/lib/monocle-ts/lensesFromInterface'
 *
 * const Person = t.type({
 *   name: t.string,
 *   age: t.number
 * })
 *
 * const lenses = lensesFromInterface(Person)
 * assert.strictEqual(lenses.age.get({ name: 'Giulio', age: 44 }), 44)
 */
export const lensesFromInterface = <C extends t.InterfaceType<any> | t.StrictType<any>>(
  codec: C
): { [K in keyof C['props']]: Lens<t.TypeOf<C>, t.TypeOfProps<C['props']>[K]> } => {
  return lensesFromProps(codec.props) as any
}
