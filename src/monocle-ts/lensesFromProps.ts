import * as t from 'io-ts'
import { Lens } from 'monocle-ts'

export type LensesFromProps<P extends t.Props, T extends t.TypeOfProps<P> = t.TypeOfProps<P>> = {
  [K in keyof P]: Lens<T, T[K]>
}

export const lensesFromProps = <P extends t.Props>(props: P): LensesFromProps<P> => {
  const r: any = {}
  for (const k in props) {
    r[k] = Lens.fromProp<any, typeof k>(k)
  }
  return r
}
