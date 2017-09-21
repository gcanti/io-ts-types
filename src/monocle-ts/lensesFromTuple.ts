import * as t from 'io-ts'
import { Lens } from 'monocle-ts'

export type LensesFromTuple5<T extends t.TupleType<[t.Any, t.Any, t.Any, t.Any, t.Any], any>> = {
  'L0': Lens<t.TypeOf<T>, t.TypeOf<T['types']['0']>>
  'L1': Lens<t.TypeOf<T>, t.TypeOf<T['types']['1']>>
  'L2': Lens<t.TypeOf<T>, t.TypeOf<T['types']['2']>>
  'L3': Lens<t.TypeOf<T>, t.TypeOf<T['types']['3']>>
  'L4': Lens<t.TypeOf<T>, t.TypeOf<T['types']['4']>>
}
export type LensesFromTuple4<T extends t.TupleType<[t.Any, t.Any, t.Any, t.Any], any>> = {
  'L0': Lens<t.TypeOf<T>, t.TypeOf<T['types']['0']>>
  'L1': Lens<t.TypeOf<T>, t.TypeOf<T['types']['1']>>
  'L2': Lens<t.TypeOf<T>, t.TypeOf<T['types']['2']>>
  'L3': Lens<t.TypeOf<T>, t.TypeOf<T['types']['3']>>
}
export type LensesFromTuple3<T extends t.TupleType<[t.Any, t.Any, t.Any], any>> = {
  'L0': Lens<t.TypeOf<T>, t.TypeOf<T['types']['0']>>
  'L1': Lens<t.TypeOf<T>, t.TypeOf<T['types']['1']>>
  'L2': Lens<t.TypeOf<T>, t.TypeOf<T['types']['2']>>
}
export type LensesFromTuple2<T extends t.TupleType<[t.Any, t.Any], any>> = {
  'L0': Lens<t.TypeOf<T>, t.TypeOf<T['types']['0']>>
  'L1': Lens<t.TypeOf<T>, t.TypeOf<T['types']['1']>>
}
export type LensesFromTuple1<T extends t.TupleType<[t.Any], any>> = {
  'L0': Lens<t.TypeOf<T>, t.TypeOf<T['types']['0']>>
}

export function lensesFromTuple<T extends t.TupleType<[t.Any, t.Any, t.Any, t.Any, t.Any], any>>(
  type: T
): LensesFromTuple5<T>
export function lensesFromTuple<T extends t.TupleType<[t.Any, t.Any, t.Any, t.Any], any>>(type: T): LensesFromTuple4<T>
export function lensesFromTuple<T extends t.TupleType<[t.Any, t.Any, t.Any], any>>(type: T): LensesFromTuple3<T>
export function lensesFromTuple<T extends t.TupleType<[t.Any, t.Any], any>>(type: T): LensesFromTuple2<T>
export function lensesFromTuple<T extends t.TupleType<[t.Any], any>>(type: T): LensesFromTuple1<T>
export function lensesFromTuple<T extends t.TupleType<any, any>>(type: T): { [key: string]: Lens<any, any> } {
  const r: { [key: string]: Lens<any, any> } = {}
  for (let i = 0; i < type.types.length; i++) {
    r['L' + i] = new Lens(
      s => s[i],
      a => s => {
        const s2 = s.slice()
        s2[i] = a
        return s2
      }
    )
  }
  return r
}
