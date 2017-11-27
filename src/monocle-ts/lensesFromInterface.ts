import * as t from 'io-ts'
import { lensesFromProps, LensesFromProps } from './lensesFromProps'

export const lensesFromInterface = <P extends t.Props>(i: t.InterfaceType<P>): LensesFromProps<P> => {
  return lensesFromProps(i.props)
}
