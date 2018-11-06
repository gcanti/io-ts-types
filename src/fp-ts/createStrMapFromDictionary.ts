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

function safeCreateStrMapFromDictionary<A, O>(
  type: t.Type<A, O, t.mixed>,
  name: string = `StrMap<${type.name}>`
): StrMapType<typeof type, StrMap<A>, Record<string, O>, t.mixed> {
  const Dict = t.dictionary(t.string, type)
  return new StrMapType(
    name,
    (m): m is StrMap<A> => m instanceof StrMap && Object.keys(m.value).every(key => type.is(m.value[key])),
    (s, c) => {
      const validation = Dict.validate(s, c)
      return validation.isLeft() ? (validation as any) : t.success(new StrMap(validation.value))
    },
    a => Dict.encode(a.value),
    type
  )
}

export const createStrMapFromDictionary: <RT extends t.Mixed>(
  type: RT,
  name?: string
) => StrMapType<
  RT,
  StrMap<t.TypeOf<RT>>,
  Record<string, t.OutputOf<RT>>,
  t.mixed
> = safeCreateStrMapFromDictionary as any
