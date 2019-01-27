import * as t from 'io-ts'

import { Option, None, Some, fromNullable } from 'fp-ts/lib/Option'

export interface JSONOption<A> {
  type: 'Option'
  value: A | null | undefined
}

export class OptionFromJSONType<C extends t.Any, A = any, O = A, I = t.mixed> extends t.Type<A, O, I> {
  readonly _tag: 'OptionFromJSONType' = 'OptionFromJSONType'
  constructor(
    name: string,
    is: OptionFromJSONType<C, A, O, I>['is'],
    validate: OptionFromJSONType<C, A, O, I>['validate'],
    serialize: OptionFromJSONType<C, A, O, I>['encode'],
    readonly type: C
  ) {
    super(name, is, validate, serialize)
  }
}

export interface OptionFromJSONC<C extends t.Mixed>
  extends OptionFromJSONType<C, Option<t.TypeOf<C>>, JSONOption<t.OutputOf<C>>, t.mixed> {}

export const createOptionFromJSON = <C extends t.Mixed>(
  codec: C,
  name: string = `Option<${codec.name}>`
): OptionFromJSONC<C> => {
  const JSONOption = t.type({
    type: t.literal('Option'),
    value: t.union([codec, t.null, t.undefined])
  })
  return new OptionFromJSONType(
    name,
    (m): m is Option<t.TypeOf<C>> => m instanceof None || (m instanceof Some && codec.is(m.value)),
    (m, c) => {
      const validation = JSONOption.validate(m, c)
      if (validation.isLeft()) {
        return validation as any
      } else {
        return t.success(fromNullable(validation.value.value))
      }
    },
    a =>
      a.foldL<JSONOption<t.OutputOf<C>>>(
        () => ({ type: 'Option', value: null }),
        value => ({ type: 'Option', value: codec.encode(value) })
      ),
    codec
  )
}
