import * as t from 'io-ts'
import { lensesFromProps } from './lensesFromProps'
import { Lens } from 'monocle-ts'

export const lensesFromInterface = <RT extends t.InterfaceType<any> | t.StrictType<any>>(
  type: RT
): { [K in keyof RT['props']]: Lens<t.TypeOf<RT>, t.TypeOfProps<RT['props']>[K]> } => {
  return lensesFromProps(type.props) as any
}
