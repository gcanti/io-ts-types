import { StrMap } from 'fp-ts/lib/StrMap'
import * as t from 'io-ts'

export class StrMapType<RT extends t.Any, A = any, O = A, I = t.mixed> extends t.Type<A, O, I> {
  readonly _tag: 'StrMapType' = 'StrMapType'
  constructor(
    name: string,
    is: StrMapType<RT, A, O, I>['is'],
    validate: StrMapType<RT, A, O, I>['validate'],
    serialize: StrMapType<RT, A, O, I>['encode'],
    readonly type: RT
  ) {
    super(name, is, validate, serialize)
  }
}

export const createStrMapFromDictionary = <RT extends t.Type<A, O>, A = any, O = A>(
  type: RT,
  name: string = `StrMap<${type.name}>`
): StrMapType<RT, StrMap<t.TypeOf<RT>>, Record<string, t.OutputOf<RT>>, t.mixed> => {
  const Dict = t.dictionary(t.string, type)
  return new StrMapType(
    name,
    (m): m is StrMap<t.TypeOf<RT>> => m instanceof StrMap && Object.keys(m.value).every(key => type.is(m.value[key])),
    (s, c) => {
      const validation = Dict.validate(s, c)
      return validation.isLeft() ? (validation as any) : t.success(new StrMap(validation.value))
    },
    a => Dict.encode(a.value),
    type
  )
}
