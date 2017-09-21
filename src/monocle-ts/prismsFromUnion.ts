import * as t from 'io-ts'
import { Prism } from 'monocle-ts'

export type PrismsFromUnion5<T extends t.UnionType<[t.Any, t.Any, t.Any, t.Any, t.Any]>> = {
  'P0': Prism<t.TypeOf<T>, t.TypeOf<T['types']['0']>>
  'P1': Prism<t.TypeOf<T>, t.TypeOf<T['types']['1']>>
  'P2': Prism<t.TypeOf<T>, t.TypeOf<T['types']['2']>>
  'P3': Prism<t.TypeOf<T>, t.TypeOf<T['types']['3']>>
  'P4': Prism<t.TypeOf<T>, t.TypeOf<T['types']['4']>>
}
export type PrismsFromUnion4<T extends t.UnionType<[t.Any, t.Any, t.Any, t.Any]>> = {
  'P0': Prism<t.TypeOf<T>, t.TypeOf<T['types']['0']>>
  'P1': Prism<t.TypeOf<T>, t.TypeOf<T['types']['1']>>
  'P2': Prism<t.TypeOf<T>, t.TypeOf<T['types']['2']>>
  'P3': Prism<t.TypeOf<T>, t.TypeOf<T['types']['3']>>
}
export type PrismsFromUnion3<T extends t.UnionType<[t.Any, t.Any, t.Any]>> = {
  'P0': Prism<t.TypeOf<T>, t.TypeOf<T['types']['0']>>
  'P1': Prism<t.TypeOf<T>, t.TypeOf<T['types']['1']>>
  'P2': Prism<t.TypeOf<T>, t.TypeOf<T['types']['2']>>
}
export type PrismsFromUnion2<T extends t.UnionType<[t.Any, t.Any]>> = {
  'P0': Prism<t.TypeOf<T>, t.TypeOf<T['types']['0']>>
  'P1': Prism<t.TypeOf<T>, t.TypeOf<T['types']['1']>>
}

export function prismsFromUnion<T extends t.UnionType<[t.Any, t.Any, t.Any, t.Any, t.Any]>>(
  type: T
): PrismsFromUnion5<T>
export function prismsFromUnion<T extends t.UnionType<[t.Any, t.Any, t.Any, t.Any]>>(type: T): PrismsFromUnion4<T>
export function prismsFromUnion<T extends t.UnionType<[t.Any, t.Any, t.Any]>>(type: T): PrismsFromUnion3<T>
export function prismsFromUnion<T extends t.UnionType<[t.Any, t.Any]>>(type: T): PrismsFromUnion2<T>
export function prismsFromUnion<T extends t.UnionType<any>>(type: T): { [key: string]: Prism<any, any> } {
  const r: { [key: string]: Prism<any, any> } = {}
  for (let i = 0; i < type.types.length; i++) {
    r['P' + i] = new Prism(s => t.validate(s, type.types[i]).toOption(), a => a)
  }
  return r
}
