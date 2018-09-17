import * as t from 'io-ts'
import { Option, Some, None, fromNullable } from 'fp-ts/lib/Option'

export class OptionFromNullableType<RT extends t.Any, A = any, O = A, I = t.mixed> extends t.Type<A, O, I> {
  readonly _tag: 'OptionFromNullableType' = 'OptionFromNullableType'
  constructor(
    name: string,
    is: OptionFromNullableType<RT, A, O, I>['is'],
    validate: OptionFromNullableType<RT, A, O, I>['validate'],
    serialize: OptionFromNullableType<RT, A, O, I>['encode'],
    readonly type: RT
  ) {
    super(name, is, validate, serialize)
  }
}

export const createOptionFromNullable = <RT extends t.Type<A, O>, A = t.TypeOf<RT>, O = t.OutputOf<RT>>(
  type: RT,
  name: string = `Option<${type.name}>`
): OptionFromNullableType<RT, Option<A>, O | null, t.mixed> => {
  const Nullable = t.union([type, t.null, t.undefined])
  return new OptionFromNullableType(
    name,
    (m): m is Option<A> => m instanceof None || (m instanceof Some && type.is(m.value)),
    (s, c) => {
      const validation = Nullable.validate(s, c)
      return validation.isLeft() ? (validation as any) : t.success(fromNullable(validation.value))
    },
    a => a.map(type.encode).toNullable(),
    type
  )
}
