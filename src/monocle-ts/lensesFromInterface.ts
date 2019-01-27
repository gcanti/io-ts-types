import * as t from 'io-ts'
import { lensesFromProps } from './lensesFromProps'
import { Lens } from 'monocle-ts'

export const lensesFromInterface = <C extends t.InterfaceType<any> | t.StrictType<any>>(
  codec: C
): { [K in keyof C['props']]: Lens<t.TypeOf<C>, t.TypeOfProps<C['props']>[K]> } => {
  return lensesFromProps(codec.props) as any
}
