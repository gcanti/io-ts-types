import * as t from 'io-ts'

export const fromNullable = <A, O, I>(codec: t.Type<A, O, I>) => (
  a: A,
  name: string = `fromNullable(${codec.name})`
): t.Type<A, O, I | undefined | null> =>
  new t.Type(name, codec.is, (i, context) => (i == null ? t.success(a) : codec.validate(i, context)), codec.encode)
