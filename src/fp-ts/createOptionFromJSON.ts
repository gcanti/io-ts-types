import * as t from 'io-ts'

import { Option, None, Some, fromNullable } from 'fp-ts/lib/Option'

export interface JSONOption<A> {
  type: 'Option'
  value: A | null | undefined
}

export class OptionFromJSONType<RT extends t.Any, A = any, O = A, I = t.mixed> extends t.Type<A, O, I> {
  readonly _tag: 'OptionFromJSONType' = 'OptionFromJSONType'
  constructor(
    name: string,
    is: OptionFromJSONType<RT, A, O, I>['is'],
    validate: OptionFromJSONType<RT, A, O, I>['validate'],
    serialize: OptionFromJSONType<RT, A, O, I>['encode'],
    readonly type: RT
  ) {
    super(name, is, validate, serialize)
  }
}

function safeCreateOptionFromJSON<A, O>(
  type: t.Type<A, O, t.mixed>,
  name: string = `Option<${type.name}>`
): OptionFromJSONType<typeof type, Option<A>, JSONOption<O>, t.mixed> {
  const JSONOption = t.type({
    type: t.literal('Option'),
    value: t.union([type, t.null, t.undefined])
  })
  return new OptionFromJSONType(
    name,
    (m): m is Option<A> => m instanceof None || (m instanceof Some && type.is(m.value)),
    (m, c) => {
      const validation = JSONOption.validate(m, c)
      if (validation.isLeft()) {
        return validation as any
      } else {
        return t.success(fromNullable(validation.value.value))
      }
    },
    a =>
      a.foldL<JSONOption<O>>(
        () => ({ type: 'Option', value: null }),
        value => ({ type: 'Option', value: type.encode(value) })
      ),
    type
  )
}

export const createOptionFromJSON: <RT extends t.Mixed>(
  type: RT,
  name?: string
) => OptionFromJSONType<RT, Option<t.TypeOf<RT>>, JSONOption<t.OutputOf<RT>>, t.mixed> = safeCreateOptionFromJSON as any
