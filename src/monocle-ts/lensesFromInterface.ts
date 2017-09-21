import * as t from 'io-ts'
import { Lens } from 'monocle-ts'

export type LensesFromProps<P extends t.Props, T extends t.InterfaceOf<P> = t.InterfaceOf<P>> = {
  [K in keyof P]: Lens<T, T[K]>
}

export function lensesFromInterface<P extends t.Props>(i: t.InterfaceType<P>): LensesFromProps<P> {
  const r: any = {}
  for (const k in i.props) {
    r[k] = Lens.fromProp<any, typeof k>(k)
  }
  return r
}
