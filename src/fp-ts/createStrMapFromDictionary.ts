import { StrMap } from 'fp-ts/lib/StrMap'
import * as t from 'io-ts'

export class StrMapType<C extends t.Any, A = any, O = A, I = unknown> extends t.Type<A, O, I> {
  readonly _tag: 'StrMapType' = 'StrMapType'
  constructor(
    name: string,
    is: StrMapType<C, A, O, I>['is'],
    validate: StrMapType<C, A, O, I>['validate'],
    serialize: StrMapType<C, A, O, I>['encode'],
    readonly type: C
  ) {
    super(name, is, validate, serialize)
  }
}

export interface StrMapC<C extends t.Mixed>
  extends StrMapType<C, StrMap<t.TypeOf<C>>, Record<string, t.OutputOf<C>>, unknown> {}

/**
 * @example
 * import * as t from 'io-ts'
 * import { createStrMapFromDictionary } from 'io-ts-types/lib/fp-ts/createStrMapFromDictionary'
 * import { right } from 'fp-ts/lib/Either'
 * import { StrMap } from 'fp-ts/lib/StrMap'
 *
 * const T = createStrMapFromDictionary(t.number)
 *
 * assert.deepStrictEqual(T.decode({ someNumber: 42 }), right(new StrMap({ someNumber: 42 })))
 * assert.deepStrictEqual(T.encode(new StrMap({ someNumber: 42 })), { someNumber: 42 })
 */
export const createStrMapFromDictionary = <C extends t.Mixed>(
  codec: C,
  name: string = `StrMap<${codec.name}>`
): StrMapC<C> => {
  const Dict = t.record(t.string, codec)
  return new StrMapType(
    name,
    (m): m is StrMap<t.TypeOf<C>> => m instanceof StrMap && Object.keys(m.value).every(key => codec.is(m.value[key])),
    (s, c) => {
      const validation = Dict.validate(s, c)
      return validation.isLeft() ? (validation as any) : t.success(new StrMap(validation.value))
    },
    a => Dict.encode(a.value),
    codec
  )
}
