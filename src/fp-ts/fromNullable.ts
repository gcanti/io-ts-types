import * as t from 'io-ts'

export const fromNullable = <A, O, I>(type: t.Type<A, O, I>) => (
  a: A,
  name: string = `fromNullable(${type.name})`
): t.Type<A, O, I | undefined | null> =>
  new t.Type(name, type.is, (i, context) => (i == null ? t.success(a) : type.validate(i, context)), type.encode)
